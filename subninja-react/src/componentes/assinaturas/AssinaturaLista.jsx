import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AssinaturaCard from "./AssinaturaCard";
import { fetchAssinaturas } from "./assinaturaThunks";
import { selectAllAssinaturas } from "./assinaturaSlice";

function AssinaturaLista() {
  const dispatch = useDispatch();
  const assinaturas = useSelector(selectAllAssinaturas);
  const status = useSelector((state) => state.assinaturas.loading);
  const error = useSelector((state) => state.assinaturas.error);

  useEffect(() => {
    dispatch(fetchAssinaturas());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Carregando assinaturas...</div>;
  }

  if (status === "failed") {
    return <div>Erro ao carregar assinaturas: {error}</div>;
  }

  return (
    <div className="assinatura-lista">
      {assinaturas.length > 0 ? (
        assinaturas.map((assinatura) => (
          <AssinaturaCard key={assinatura.id} id={assinatura.id} />
        ))
      ) : (
        <div className="text-muted">Nenhuma assinatura cadastrada</div>
      )}
    </div>
  );
}

export default AssinaturaLista;
