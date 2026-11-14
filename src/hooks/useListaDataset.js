import { useEffect, useState } from 'react';

const carregando = { status: 'carregando', itens: [], geradoEm: null };

export function useListaDataset(DAO) {
  const [tentativa, setTentativa] = useState(0);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const dao = new DAO({ signal });

    async function carregar() {
      try {
        const lista = await dao.carregar();
        if (!signal.aborted) setResultado({ tentativa, status: 'pronto', ...lista });
      } catch {
        if (!signal.aborted) setResultado({ tentativa, status: 'erro', itens: [], geradoEm: null });
      }
    }

    void carregar();
    return () => controller.abort();
  }, [DAO, tentativa]);

  return {
    ...(resultado?.tentativa === tentativa ? resultado : carregando),
    tentarNovamente: () => setTentativa(atual => atual + 1),
  };
}
