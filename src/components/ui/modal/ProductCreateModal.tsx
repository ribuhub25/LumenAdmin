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
import { toast } from "sonner";
import { postFormData } from "../../../hooks/postFormData";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}
interface PropsModal {
  isOpen: boolean;
  closeModal: () => void;
  refetch: () => void;
}
interface IFormInput {
  name: string
  price: number
  stock: number
  brand_id: number
}

export default function ProductCreateModal({
  isOpen,
  closeModal,
  refetch
}: PropsModal) {
  //CONSTANTES PARA EL FORMULARIO
  const [productForm, setProductForm] = useState<IProduct>(PRODUCT_INITIAL);
  const fetchBrandOptions = getData<Option[]>(
    "http://localhost:3000/api/brands/list"
  );
  const { control,handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      brand_id: 1
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    
    // closeModal();
    // const promise = postFormData("http://localhost:3000/api/products/create", formData);
    // toast.promise(promise, {
    //   loading: 'Creando el producto...',
    //   success: (res) => {
    //     if (res != undefined) refetch();
    //     setProductForm(PRODUCT_INITIAL);
    //     return res.message;
    //   },
    //   error: "Error en la petición de envío de datos para la inserción de un producto, Contácte con soporte técnico!"
    // });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", productForm.name);
  //   formData.append("price", productForm.price.toString());
  //   formData.append("stock", productForm.stock.toString());
  //   formData.append("status", productForm.status.toString());
  //   formData.append("brand_id", productForm.brand_id?.toString() || "");
  //   if (productForm.image) {
  //     formData.append("image", productForm.image);
  //   }
  // };

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
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Campos del Producto
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2">
                  <div>
                    <Label>Nombre</Label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "El nombre es obligatorio" }}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          value={productForm.name ?? ""}
                          onChange={(e) =>
                            setProductForm((prev) => ({
                              ...prev,
                              name: e,
                            }))
                          }
                          placeholder="Nombre del Producto"
                          rows={2}
                          error={!!errors.name}
                          hint={errors.name?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <div>
                      <Label>Precio</Label>
                      <Controller
                        name="price"
                        control={control}
                        rules={{ required: "El correo es obligatorio" }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            value={productForm.price ?? 0}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setProductForm((prev) => ({
                                ...prev,
                                price: parseFloat(e.target.value) || 0,
                              }))
                            }
                            placeholder="precio"
                            error={!!errors.price}
                            hint={errors.price?.message}
                          />
                        )}
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
                      <Controller
                        name="stock"
                        control={control}
                        rules={{ required: "El stock es obligatorio" }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            value={productForm.stock ?? 0}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setProductForm((prev) => ({
                                ...prev,
                                stock: parseFloat(e.target.value) || 0,
                              }))
                            }
                            placeholder="Stock"
                            error={!!errors.stock}
                            hint={errors.stock?.message}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex flex-row gap-2 justify-between">
                    <div className="w-5/7">
                      <Label>Marca</Label>
                      <Controller
                        name="brand_id"
                        control={control}
                        rules={{ required: "La marca es obligatorio" }}
                        render={({ field }) => (
                          <Select
                            {...field}
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
                            error={!!errors.brand_id}
                            hint={errors.brand_id?.message}
                          />
                        )}
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
