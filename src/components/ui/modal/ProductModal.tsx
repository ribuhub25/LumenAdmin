import { useEffect, useState } from "react";
import { Modal } from ".";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import Label from "../../form/Label";
import Select from "../../form/Select";
import Switch from "../../form/switch/Switch";
import Button from "../button/Button";
import MultiSelect from "../../form/MultiSelect";
import { PRODUCT_INITIAL, IProduct } from "../../../models/ProductDTO";
import useFetch from "../../../hooks/useFetch";
import { postData } from "../../../hooks/postData";
import { ProductResponse } from "../../../models/ProductResponse";
import { ICategory } from "../../../models/CategoryDTO";

interface MultiOptions {
  value: string;
  text: string;
  selected: boolean;
}
interface Option {
  value: string;
  label: string;
}
interface PropsModal {
  product: IProduct;
  isOpen: boolean;
  closeModal: () => void;
  onUpdate: (p: IProduct) => void;
}

const castToProductResponse = (form: IProduct): ProductResponse => {
  return {
    id: form.id,
    created_at:
      form.created_at instanceof Date
        ? form.created_at.toISOString()
        : form.created_at, // si ya es string, lo deja igual
    name: form.name,
    price: form.price,
    rating: form.rating,
    review_count: form.review_count,
    href: form.href,
    description: form.description,
    imageSrc: form.imageSrc,
    imageAlt: form.imageAlt,
    status: form.status,
    brand_id: form.brand_id, // ← cambio de nombre
    stock: form.stock,
    long_description: form.long_description ?? "", // ← si no existe, lo rellena
    features: form.features ?? "", // ← si no existe, lo rellena
    categories: form.categories.map((c) => c.id.toString()),
  };
};

export default function ProductModal({
  product,
  isOpen,
  closeModal,
  onUpdate,
}: PropsModal) {
  //METODOS PARA CARGAR LOS COMBOS
  const fetchCategoryOptions = useFetch<Option[]>(
    "http://localhost:3000/api/brands/categorylist"
  );
  const fetchBrandOptions = useFetch<Option[]>(
    "http://localhost:3000/api/brands/list"
  );

  //CONSTANTES PARA EL FORMULARIO
  const [productForm, setProductForm] = useState<IProduct>(PRODUCT_INITIAL);

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault(); // ← evita el reload si se dispara desde un form
    try {
      const updatedProduct = {
        ...productForm,
      };
      const castedProduct = castToProductResponse(updatedProduct);
      await postData("http://localhost:3000/api/products/save", castedProduct);
      onUpdate(updatedProduct);
      closeModal();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  useEffect(() => {
    if (product && isOpen) {
      setProductForm({ ...product });
    }
  }, [product, isOpen]);

  // OPCIONES DE CATEGORIAS
  const categoryMultiOptions: MultiOptions[] = (
    fetchCategoryOptions.data || []
  ).map((option: Option) => ({
    value: option.value,
    text: option.label,
    selected: true, // o true si quieres marcar alguno por defecto
  }));

  if (fetchBrandOptions.loading) return <p>Cargando...</p>;
  if (fetchBrandOptions.error) return <p>Error: {fetchBrandOptions.error}</p>;
  if (fetchBrandOptions.loading || fetchCategoryOptions.loading) {
    return <p>Cargando opciones...</p>;
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-6">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 truncate max-w-[500px]">
            Editar {product?.name}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Modifica los campos del formulario y guarda los cambios!
          </p>
        </div>
        <form className="flex flex-col">
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
                        options={fetchBrandOptions.data!}
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
                </div>
              </div>
            </div>
            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Categorias Asociadas
              </h5>
              <div>
                <MultiSelect
                  label="Categorias"
                  options={categoryMultiOptions}
                  value={productForm.categories.map((c) =>
                    c.id.toString()
                  )}
                  onChange={(values) => {
                    const selectedCategories: ICategory[] = categoryMultiOptions
                      .filter((opt) => values.includes(opt.value))
                      .map((opt) => ({
                        id: parseInt(opt.value),
                        name: opt.text,
                        href: "",
                      }));

                    setProductForm((prev) => ({
                      ...prev,
                      categories: selectedCategories,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cerrar
            </Button>
            <Button size="sm" onClick={handleSubmit}>
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
