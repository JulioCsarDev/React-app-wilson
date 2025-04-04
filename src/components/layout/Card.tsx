import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  tittle: string;
  toolbar?: ReactNode;
  footer?: ReactNode;
}

function Card({ children, tittle, toolbar, footer }: CardProps) {
  return (
    <div
      className="card"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div className="card-header">
        <div className="card-toolbar">
          <div className="card-tittle fs-4 fw-semibold d-flex justify-content-between">
            {tittle}
            {toolbar}
          </div>
        </div>
      </div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

export default Card;
