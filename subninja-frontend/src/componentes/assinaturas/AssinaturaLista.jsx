import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AssinaturaCard from "./AssinaturaCard";
import { fetchAssinaturas } from "./assinaturaThunks";
import { selectAllAssinaturas } from "./assinaturaSlice";
import { selectAllCategorias } from "../categorias/categoriasSlice";
import { fetchCategorias } from "../categorias/categoriasThunks";
import { useNavigate } from "react-router-dom";

function AssinaturaLista() {
  const dispatch = useDispatch();
  const assinaturas = useSelector(selectAllAssinaturas);
  const status = useSelector((state) => state.assinaturas.loading);
  const error = useSelector((state) => state.assinaturas.error);
  const navigate = useNavigate();

  const categorias = useSelector(selectAllCategorias);
  const statusCategorias = useSelector((state) => state.categorias.status);

  useEffect(() => {
    dispatch(fetchAssinaturas());
  }, [dispatch]);

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

  if (assinaturas.length === 0) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh"
      }}>
        <p className="mb-4 text-muted fs-5">Nenhuma assinatura cadastrada</p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/nova-assinatura")}
        >
          Cadastre uma assinatura
        </button>
      </div>
    );
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