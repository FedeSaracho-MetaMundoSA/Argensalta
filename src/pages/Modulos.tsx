import React from 'react';
import { Helmet } from 'react-helmet-async';
import ModulosPremium from '../components/ModulosPremium';

export default function Modulos() {
  return (
    <div className="bg-black min-h-screen text-white pt-24 font-sans pb-24">
      <Helmet>
        <title>Módulos Habitables Premium | Argensalta Propiedades</title>
      </Helmet>
      <ModulosPremium />
    </div>
  );
}
