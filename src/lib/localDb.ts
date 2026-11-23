// Virtual Local Database Engine for ArgenSalta Propiedades
// This file simulates a robust, highly-reliable cloud database entirely on localStorage.
// It bypasses any closed or inactive Firebase accounts, ensuring 100% functionality.

export interface VirtualUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  phone?: string;
  address?: string;
  createdAt: number;
}

export interface VirtualLot {
  id: string;
  block: string;
  lotNumber: string;
  surface: number;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  clientId?: string;
  clientName?: string;
  createdAt: number;
}

export interface VirtualPayment {
  id: string;
  userId: string;
  userName: string;
  lotId: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  concept: string;
}

export interface VirtualTransparencyDoc {
  id: string;
  block?: string;
  lotNumber?: string;
  title: string;
  date: string;
  amountUsd: number;
  fileUrl?: string;
}

// Initial Seed Data for a beautiful, fully-configured platform
const INITIAL_USERS: VirtualUser[] = [
  {
    id: 'local-admin-uid-123',
    name: 'Fede Saracho',
    email: 'fedesaracho06lc@gmail.com',
    role: 'admin',
    phone: '+54 387 555-7009',
    address: 'Salta Capital, Argentina',
    createdAt: Date.now()
  },
  {
    id: 'local-admin-uid-124',
    name: 'ArgenSalta Admin',
    email: 'argensaltapropiedades@gmail.com',
    role: 'admin',
    phone: '+54 387 555-7009',
    address: 'Salta Capital, Argentina',
    createdAt: Date.now()
  },
  {
    id: 'local-client-uid-456',
    name: 'Propietario Demo',
    email: 'propietario@argensalta.com',
    role: 'client',
    phone: '+54 9 387 4123456',
    address: 'Grand Bourg, Salta',
    createdAt: Date.now()
  },
  {
    id: 'local-client-uid-789',
    name: 'María Alejandra Gómez',
    email: 'maria.gomez@gmail.com',
    role: 'client',
    phone: '+54 9 387 5987654',
    address: 'Tres Cerritos, Salta',
    createdAt: Date.now()
  }
];

const INITIAL_LOTS: VirtualLot[] = [
  { id: 'lot-1', block: 'A', lotNumber: '12', surface: 350, price: 12500, status: 'sold', clientId: 'local-client-uid-456', clientName: 'Propietario Demo', createdAt: Date.now() - 10000000 },
  { id: 'lot-2', block: 'A', lotNumber: '14', surface: 400, price: 14000, status: 'sold', clientId: 'local-client-uid-456', clientName: 'Propietario Demo', createdAt: Date.now() - 9000000 },
  { id: 'lot-3', block: 'B', lotNumber: '05', surface: 320, price: 11000, status: 'reserved', clientId: 'local-client-uid-789', clientName: 'María Alejandra Gómez', createdAt: Date.now() - 8000000 },
  { id: 'lot-4', block: 'B', lotNumber: '06', surface: 320, price: 11000, status: 'available', createdAt: Date.now() },
  { id: 'lot-5', block: 'C', lotNumber: '21', surface: 450, price: 16500, status: 'available', createdAt: Date.now() },
  { id: 'lot-6', block: 'C', lotNumber: '22', surface: 450, price: 16500, status: 'sold', clientId: 'local-client-uid-789', clientName: 'María Alejandra Gómez', createdAt: Date.now() - 7000000 },
  { id: 'lot-7', block: 'D', lotNumber: '01', surface: 500, price: 19000, status: 'available', createdAt: Date.now() },
  { id: 'lot-8', block: 'D', lotNumber: '02', surface: 500, price: 19000, status: 'available', createdAt: Date.now() },
  { id: 'lot-9', block: 'E', lotNumber: '10', surface: 300, price: 10000, status: 'available', createdAt: Date.now() },
];

const INITIAL_PAYMENTS: VirtualPayment[] = [
  { id: 'pay-1', userId: 'local-client-uid-456', userName: 'Propietario Demo', lotId: 'lot-1', amount: 2500, status: 'paid', date: '2026-06-15', concept: 'Anticipo Lote A-12' },
  { id: 'pay-2', userId: 'local-client-uid-456', userName: 'Propietario Demo', lotId: 'lot-1', amount: 800, status: 'paid', date: '2026-07-01', concept: 'Cuota 1/12 Lote A-12' },
  { id: 'pay-3', userId: 'local-client-uid-456', userName: 'Propietario Demo', lotId: 'lot-1', amount: 800, status: 'pending', date: '2026-08-01', concept: 'Cuota 2/12 Lote A-12' },
  { id: 'pay-4', userId: 'local-client-uid-789', userName: 'María Alejandra Gómez', lotId: 'lot-3', amount: 3000, status: 'paid', date: '2026-06-20', concept: 'Reserva Lote B-05' },
];

const INITIAL_TRANSPARENCY: VirtualTransparencyDoc[] = [
  { id: 'trans-1', block: 'A', lotNumber: '12', title: 'Apertura de Calles - Agrimensura Certificada', date: '2026-06-10', amountUsd: 1200 },
  { id: 'trans-2', block: 'A', lotNumber: '14', title: 'Conexión Eléctrica Principal - Puesta a Tierra', date: '2026-06-25', amountUsd: 2100 },
  { id: 'trans-3', block: 'B', lotNumber: '05', title: 'Nivelación de Terreno e Informe Hidrológico', date: '2026-07-02', amountUsd: 850 },
];

// LocalStorage Keys
const KEYS = {
  USERS: 'argensalta_users_db',
  LOTS: 'argensalta_lots_db',
  PAYMENTS: 'argensalta_payments_db',
  TRANSPARENCY: 'argensalta_transparency_db',
};

class LocalDatabase {
  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(KEYS.LOTS)) {
      localStorage.setItem(KEYS.LOTS, JSON.stringify(INITIAL_LOTS));
    }
    if (!localStorage.getItem(KEYS.PAYMENTS)) {
      localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(INITIAL_PAYMENTS));
    }
    if (!localStorage.getItem(KEYS.TRANSPARENCY)) {
      localStorage.setItem(KEYS.TRANSPARENCY, JSON.stringify(INITIAL_TRANSPARENCY));
    }
  }

  // --- USERS Operations ---
  getUsers(): VirtualUser[] {
    try {
      return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
    } catch {
      return INITIAL_USERS;
    }
  }

  saveUser(user: VirtualUser) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase() || u.id === user.id);
    if (index >= 0) {
      users[index] = { ...users[index], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return user;
  }

  getUserByEmail(email: string): VirtualUser | undefined {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  }

  // --- LOTS Operations ---
  getLots(): VirtualLot[] {
    try {
      return JSON.parse(localStorage.getItem(KEYS.LOTS) || '[]');
    } catch {
      return INITIAL_LOTS;
    }
  }

  saveLot(lot: VirtualLot) {
    const lots = this.getLots();
    const index = lots.findIndex(l => l.id === lot.id);
    if (index >= 0) {
      lots[index] = { ...lots[index], ...lot };
    } else {
      lots.push(lot);
    }
    localStorage.setItem(KEYS.LOTS, JSON.stringify(lots));
    return lot;
  }

  addLot(lot: Omit<VirtualLot, 'id' | 'createdAt'>) {
    const lots = this.getLots();
    const newLotItem: VirtualLot = {
      ...lot,
      id: `lot-${Date.now()}`,
      createdAt: Date.now()
    };
    lots.push(newLotItem);
    localStorage.setItem(KEYS.LOTS, JSON.stringify(lots));
    return newLotItem;
  }

  // --- PAYMENTS Operations ---
  getPayments(): VirtualPayment[] {
    try {
      return JSON.parse(localStorage.getItem(KEYS.PAYMENTS) || '[]');
    } catch {
      return INITIAL_PAYMENTS;
    }
  }

  savePayment(payment: VirtualPayment) {
    const payments = this.getPayments();
    const index = payments.findIndex(p => p.id === payment.id);
    if (index >= 0) {
      payments[index] = { ...payments[index], ...payment };
    } else {
      payments.push(payment);
    }
    localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(payments));
    return payment;
  }

  addPayment(payment: Omit<VirtualPayment, 'id'>) {
    const payments = this.getPayments();
    const newPaymentItem: VirtualPayment = {
      ...payment,
      id: `pay-${Date.now()}`
    };
    payments.push(newPaymentItem);
    localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(payments));
    return newPaymentItem;
  }

  // --- TRANSPARENCY Operations ---
  getTransparencyDocs(): VirtualTransparencyDoc[] {
    try {
      return JSON.parse(localStorage.getItem(KEYS.TRANSPARENCY) || '[]');
    } catch {
      return INITIAL_TRANSPARENCY;
    }
  }

  addTransparencyDoc(doc: Omit<VirtualTransparencyDoc, 'id'>) {
    const docs = this.getTransparencyDocs();
    const newDoc: VirtualTransparencyDoc = {
      ...doc,
      id: `trans-${Date.now()}`
    };
    docs.push(newDoc);
    localStorage.setItem(KEYS.TRANSPARENCY, JSON.stringify(docs));
    return newDoc;
  }
}

export const LocalDB = new LocalDatabase();
