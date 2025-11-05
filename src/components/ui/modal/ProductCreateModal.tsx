import { useState } from "react";
import { Modal } from "./Modal";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import Label from "../../form/Label";
import Select from "../../form/Select";
import Switch from "../../form/switch/Switch";
import Button from "../button/Button";
import { PRODUCT_INITIAL, IProduct } from "../../../models/ProductDTO";
import getData from "../../../hooks/getData";
import Dropzone from "../../form/form-elements/DropZone";

interface Option {
  value: string;
  label: string;
}
interface PropsModal {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ProductCreateModal({
  isOpen,
  closeModal,
}: PropsModal) {
  //CONSTANTES PARA EL FORMULARIO
  const [productForm, setProductForm] = useState<IProduct>(PRODUCT_INITIAL);
  const fetchBrandOptions = getData<Option[]>(
    "http://localhost:3000/api/brands/list"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("price", productForm.price.toString());
    formData.append("stock", productForm.stock.toString());
    formData.append("status", productForm.status.toString());
    formData.append("brand_id", productForm.brand_id?.toString() || "");
    if (productForm.image) {
      formData.append("image", productForm.image);
    }
    try {
      const response = await fetch("http://localhost:3000/api/products/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      const result = await response.json();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-6">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 truncate max-w-[500px]">
            Crear Nuevo Producto
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Rellena los campos del formulario y guarda los cambios!
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Campos del Producto
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2">
                  <div>
                    <Label>Nombre</Label>
                    <TextArea
                      value={productForm.name ?? ""}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          name: e,
                        }))
                      }
                      placeholder="Nombre del Producto"
                      rows={2}
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <div>
                      <Label>Precio</Label>
                      <Input
                        type="number"
                        value={productForm.price ?? 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setProductForm((prev) => ({
                            ...prev,
                            price: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Descuento</Label>
                      <Input
                        type="number"
                        disabled
                        value={productForm.disc_value ?? 0}
                      />
                    </div>
                    <div>
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={productForm.stock ?? 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setProductForm((prev) => ({
                            ...prev,
                            stock: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex flex-row gap-2 justify-between">
                    <div className="w-5/7">
                      <Label>Marca</Label>
                      <Select
                        options={fetchBrandOptions.data ?? []}
                        placeholder="Seleccione una marca"
                        value={productForm.brand_id?.toString() || ""}
                        onChange={(value: string) =>
                          setProductForm((prev) => ({
                            ...prev,
                            brand_id: parseInt(value),
                            brand_name:
                              fetchBrandOptions.data?.find(
                                (b) => b.value == value
                              )?.label ?? "",
                          }))
                        }
                        className="dark:bg-dark-900"
                      />
                    </div>
                    <div className="my-auto pt-5">
                      <Switch
                        label="Producto Activo"
                        checked={productForm.status === 1}
                        onChange={(checked: boolean) => {
                          setProductForm((prev) => ({
                            ...prev,
                            status: checked ? 1 : 0,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="my-auto pt-5">
                    <Dropzone onImageSelect={(file) => setProductForm((prev) => ({ ...prev, image: file }))} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cerrar
            </Button>
            <Button size="sm" type="submit">
              Crear Producto
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
