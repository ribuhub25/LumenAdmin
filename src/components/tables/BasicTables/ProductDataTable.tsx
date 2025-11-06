import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { ListIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { PRODUCT_INITIAL, IProduct } from "../../../models/ProductDTO";
import ProductEditModal from "../../ui/modal/ProductEditModal";
import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import ProductRemoveModal from "../../ui/modal/ProductRemoveModal";

interface PropsDataTable {
  products: IProduct[];
  onUpdate: (product: IProduct) => void;
  loading: boolean;
  onSortChange: (sort: string) => void;
  sort: string,
  refetch: () => void
}

const Headers = [
  { name: "Nombre", orderable: true, visible: true, sortValue: "name" },
  { name: "Precio", orderable: true, visible: true, sortValue: "price" },
  {
    name: "Descuento",
    orderable: true,
    visible: true,
    sortValue: "disc_value",
  },
  { name: "Marca", orderable: true, visible: true, sortValue: "brand_name" },
  { name: "Stock", orderable: true, visible: true, sortValue: "stock" },
  { name: "Estado", orderable: false, visible: true, sortValue: "" },
  { name: "Acciones", orderable: false, visible: true, sortValue: "" },
];
const PropsModalRemove = {
  productId: 0,
  text: ""
};

export default function ProductDataTable({
  products,
  onUpdate,
  loading,
  onSortChange,
  sort,
  refetch
}: PropsDataTable) {
  const { openModal: openEditModal, closeModal: closeEditModal, isOpen: isOpenEdit } = useModal();
  const { openModal: openRemoveModal, closeModal: closeRemoveModal, isOpen: isOpenRemove } = useModal();
  const [selectedProduct, setSelectedProduct] =
    useState<IProduct>(PRODUCT_INITIAL);
  const [propsRemove, setPropsRemove] = useState(PropsModalRemove);
  
  const handleEditClick = (p: IProduct) => {
    setSelectedProduct(p);
    openEditModal();
  };

  const handleRemoveClick = (p: IProduct) => {
    setPropsRemove({
      productId: p.id,
      text: p.name
    })
    openRemoveModal();
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {Headers.map((header) => (
                  <TableCell
                    key={header.name}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    <span className="flex justify-between gap-1">
                      {header.name}
                      {header.orderable ? (
                        <ArrowsUpDownIcon
                          className={`size-4 cursor-pointer transition-colors ${
                            sort.startsWith(header.sortValue)
                              ? "text-blue-500"
                              : "text-gray-400"
                          }`}
                          onClick={() => onSortChange(header.sortValue)}
                        />
                      ) : (
                        <></>
                      )}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            {!loading ? (
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {products.map((product: IProduct) => (
                  <TableRow
                    key={product.id}
                    className="transition-opacity duration-500 ease-in-out opacity-100"
                  >
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            width={40}
                            height={40}
                            src={product.imageSrc}
                            alt={product.imageAlt}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {product.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.disc_value.toFixed(2)}%
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.brand_name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.stock}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          product.status === 1
                            ? "success"
                            : product.status === 0
                            ? "warning"
                            : "error"
                        }
                      >
                        {product.status === 1 ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex justify-between gap-0.5">
                        <button
                          type="button"
                          className="p-1 bg-blue-100 dark:bg-blue-950 rounded-2xl"
                          onClick={() => handleEditClick(product)}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          type="button"
                          className="p-1 bg-red-100 dark:bg-red-950 rounded-2xl"
                          onClick={() => handleRemoveClick(product)}
                        >
                          <TrashBinIcon />
                        </button>
                        <button
                          type="button"
                          className="p-1 bg-gray-100 dark:bg-gray-950 rounded-2xl"
                        >
                          <ListIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody className="items-center">
                <TableRow>
                  <td
                    className="text-center p-4 text-gray-800 text-theme-sm dark:text-white/90 transition-opacity duration-500 ease-in-out opacity-100"
                    colSpan={100}
                  >
                    <div className="flex justify-center items-center space-x-3">
                      <div className="h-5 w-5 border-4 border-gray-300 border-t-gray-800 dark:border-t-white rounded-full animate-spin"></div>
                      <span>Cargando los Productos en la tabla...</span>
                    </div>
                  </td>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      {/*MODAL DE EDICIÓN */}
      <ProductEditModal
        product={selectedProduct}
        closeModal={closeEditModal}
        isOpen={isOpenEdit}
        onUpdate={onUpdate}
      />
      {/*MODAL DE ELIMINACIÓN */}
      <ProductRemoveModal
        text={propsRemove.text}
        productId={propsRemove.productId}
        closeModal={closeRemoveModal}
        isOpen={isOpenRemove}
        refetch={refetch}
      />
    </>
  );
}
