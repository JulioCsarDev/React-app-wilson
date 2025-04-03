import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  tittle: string;
  toolbarA?: ReactNode;
  toolbarD?: ReactNode;
  footer?: ReactNode;
}

function Card({ children, tittle, toolbarA, toolbarD, footer }: CardProps) {
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
            <div className="d-flex gap-2">
              {toolbarD}
              {toolbarA}
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

export default Card;
