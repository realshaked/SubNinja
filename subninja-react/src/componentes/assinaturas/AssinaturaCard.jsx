export default function AssinaturaCard({ nome,tipo,preco,dataVencimento,periodo}){
    return(
        <div className="card-assinatura">
            <div className="card-conteudo">
                <div className="icone-assinatura">
                    <i className="icone" ></i>
                </div>
                <div className="info-assinatura">
                    <h3>{nome}</h3>
                    <p className="text-muted">{tipo}</p>
                    <div className= "detalhes-assinatura">
                        <p className= "preco-assinatura">
                            {preco}<span>{periodo}</span>
                        </p>
                        <div className="data-vencimento">
                            <img className="calendario-icone" src = ".\src\assets\calendar.svg"/><p>{dataVencimento}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};