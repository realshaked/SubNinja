import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AssinaturaCard from "./AssinaturaCard";
import { fetchAssinaturas } from "./assinaturaThunks";
import { selectAllAssinaturas } from "./assinaturaSlice";
import { selectAllCategorias } from "../categorias/categoriasSlice";
import { fetchCategorias } from "../categorias/categoriasThunks";

function AssinaturaLista() {
  const dispatch = useDispatch();
  const assinaturas = useSelector(selectAllAssinaturas);
  const status = useSelector((state) => state.assinaturas.loading);
  const error = useSelector((state) => state.assinaturas.error);

  const categorias = useSelector(selectAllCategorias);
  const statusCategorias = useSelector((state) => state.categorias.status);

  useEffect(() => {
    dispatch(fetchAssinaturas());
  }, [dispatch]);

  // Busca categorias se necessário
  useEffect(() => {
    if (statusCategorias === "idle") {
      dispatch(fetchCategorias());
    }
  }, [dispatch, statusCategorias]);

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
          <AssinaturaCard key={assinatura._id} id={assinatura._id} />
        ))
      ) : (
        <div className="text-muted">Nenhuma assinatura cadastrada</div>
      )}
    </div>
  );
}

export default AssinaturaLista;