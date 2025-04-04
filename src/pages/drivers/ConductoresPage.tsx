import { Container } from "../../components/container/Container";
import Card from "../../components/layout/Card";
import { columns } from "./components/Columns";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { DataTable } from "../../components/datatable/DataTable";
import { useDrivers } from "./hooks/useDrivers";
import Pagination from "../../components/paginator/Paginator";
import { useState } from "react";
import { ModalUploadFile } from "./components/ModalUploadFile";
import { ModalNewDriver } from "./components/ModalNewDriver";
import { DriverModel } from "./models/conductor.models";
import { ModalUpdateDriver } from "./components/ModalUpdateDriver";
import { ModalDetailDriver } from "./components/ModalDetailDriver";

export const ConductoresPage = () => {
  const { data: Drivers } = useDrivers();

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const [selectedDriver, setSelectedDriver] = useState<DriverModel | null>(
    null
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModelDetail, setIsOpenModalDetail] = useState(false);

  const handleClickEdit = (driver: DriverModel) => {
    setSelectedDriver(driver);
    setIsOpen(true);
  };
  const handleClickDetail = (driver: DriverModel) => {
    setSelectedDriver(driver);
    setIsOpenModalDetail(true);
  };

  const table = useReactTable({
    data: Drivers || [],
    columns: columns({ handleClickEdit, handleClickDetail }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  return (
    <Container>
      <Card
        tittle="Conductores"
        toolbar={
          <div>
            <ModalNewDriver /> <ModalUploadFile />
          </div>
        }
      >
        <DataTable
          table={table}
          columns={columns({ handleClickEdit, handleClickDetail })}
          footer={<Pagination table={table} />}
          nameTable="Lista de Conductores"
          filterGlobal={
            <div className="input-group w-25">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search"></i>
                </span>
              </div>
              <input
                className="form-control"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Buscar"
              />
            </div>
          }
        />
      </Card>
      <ModalUpdateDriver
        driver={selectedDriver}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ModalDetailDriver
        driver={selectedDriver}
        isOpenModalDetail={isOpenModelDetail}
        setIsOpenModalDetail={setIsOpenModalDetail}
      />
    </Container>
  );
};
