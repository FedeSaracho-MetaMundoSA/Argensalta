import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json";

// Initialize Firebase App and Firestore for the backend
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

const app = express();
const PORT = 3000;

// Enable JSON body parsing with reasonable size limit
app.use(express.json({ limit: "1mb" }));

// API endpoint for CRM lead capturing
app.post("/api/webhook/crm", async (req, res) => {
  try {
    const { apiKey, nombre, email, telefono, mensaje, origen } = req.body;

    // 1. Verify ApiKey
    if (apiKey !== "as_prop_H81ZPRPL") {
      console.warn(`[CRM Webhook] Unauthorized attempt with apiKey: ${apiKey}`);
      return res.status(401).json({ 
        success: false, 
        error: "Unauthorized: Invalid API Key" 
      });
    }

    // 2. Validate required fields
    const nameStr = String(nombre || "").trim();
    const emailStr = String(email || "").trim();
    const phoneStr = String(telefono || "").trim();
    const messageStr = mensaje ? String(mensaje).trim() : "";
    const sourceStr = origen ? String(origen).trim() : "WordPress Plugin";

    if (!nameStr) {
      return res.status(400).json({ success: false, error: "El campo 'nombre' es requerido." });
    }
    if (!emailStr) {
      return res.status(400).json({ success: false, error: "El campo 'email' es requerido." });
    }
    if (!phoneStr) {
      return res.status(400).json({ success: false, error: "El campo 'telefono' es requerido." });
    }

    // Enforce schema boundaries matching firestore.rules
    if (nameStr.length > 128) {
      return res.status(400).json({ success: false, error: "El nombre es demasiado largo (máx 128)." });
    }
    if (emailStr.length > 128) {
      return res.status(400).json({ success: false, error: "El email es demasiado largo (máx 128)." });
    }
    if (phoneStr.length > 64) {
      return res.status(400).json({ success: false, error: "El teléfono es demasiado largo (máx 64)." });
    }
    if (messageStr.length > 1000) {
      return res.status(400).json({ success: false, error: "El mensaje es demasiado largo (máx 1000)." });
    }
    if (sourceStr.length > 128) {
      return res.status(400).json({ success: false, error: "El origen es demasiado largo (máx 128)." });
    }

    // 3. Construct lead document matching firebase-blueprint.json & firestore.rules
    const leadData = {
      name: nameStr,
      email: emailStr,
      phone: phoneStr,
      message: messageStr,
      source: sourceStr,
      status: "new" as const, // New leads start with 'new' status
      createdAt: Date.now()
    };

    console.log(`[CRM Webhook] Saving new lead:`, leadData);

    // 4. Save to Firestore leads collection
    const docRef = await addDoc(collection(db, "leads"), leadData);

    console.log(`[CRM Webhook] Lead saved successfully with ID: ${docRef.id}`);

    return res.status(200).json({
      success: true,
      message: "Lead capturado con éxito",
      leadId: docRef.id
    });

  } catch (error) {
    console.error("[CRM Webhook] Error capturing lead:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Vite middleware and routing setup for full-stack architecture
async function setupFrontend() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

setupFrontend().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
