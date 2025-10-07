import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import {ListIcon, PencilIcon, TrashBinIcon } from "../../../icons";

export interface ProductDTO {
    id: number,
    created_at: Date,
    name: string,
    price: number,
    rating: number,
    review_count: number,
    href: string,
    description: string,
    imageSrc: string,
    imageAlt: string,
    discount: number,
    status: number,
    brand_Id: number,
    stock: number,
    brand_name: string,
    code: string,
    final_price: number,
    is_new: boolean,
    categories: Array<Object>
}

export default function ProductDataTable({ products }: { products: ProductDTO[] }) {

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Nombre
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Precio
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Descuento
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Marca
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Stock
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Estado
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    {
                        products
                            ? <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {products.map((product: ProductDTO) => (
                                    <TableRow key={product.id}>
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
                                            {product.discount.toFixed(2)}%
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
                                                {product.status === 1
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <div className="flex justify-between gap-0.5">
                                                <button type="button" className="p-1 bg-blue-100 dark:bg-blue-950 rounded-2xl"><PencilIcon /></button>
                                                <button type="button" className="p-1 bg-red-100 dark:bg-red-950 rounded-2xl"><TrashBinIcon /></button>
                                                <button type="button" className="p-1 bg-gray-100 dark:bg-gray-950 rounded-2xl"><ListIcon /></button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            : <></>
                    }
                </Table>
            </div>
        </div>
    );
}
