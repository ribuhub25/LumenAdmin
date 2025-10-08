import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import ProductDataTable from "../../components/tables/BasicTables/ProductDataTable";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import useFetch from "../../hooks/useFetch";
import { useModal } from "../../hooks/useModal";
import { ProductDTO } from "../../models/ProductDTO";
import Switch from "../../components/form/switch/Switch";
import MultiSelect from "../../components/form/MultiSelect";
// import DropzoneComponent from "../../components/form/form-elements/DropZone";

const options = [
  { value: "10", label: "10 Items" },
  { value: "15", label: "15 Items" },
  { value: "20", label: "20 Items" },
  { value: "25", label: "25 Items" },
];

const multiOptions = [
  { value: "1", text: "Option 1", selected: false },
  { value: "2", text: "Option 2", selected: false },
  { value: "3", text: "Option 3", selected: false },
  { value: "4", text: "Option 4", selected: false },
  { value: "5", text: "Option 5", selected: false },
];

export default function Products() {
  const { isOpen, openModal, closeModal } = useModal();
  //CONSTANTES PARA EL FORMULARIO
  const [message, setMessage] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const { data, loading, error } = useFetch<ProductDTO[]>(
    "http://localhost:3000/api/products"
  );
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <PageBreadcrumb pageTitle="Productos" />
      {/*TABLA DE PRODUCTOS*/}
      <div className="space-y-6">
        <ComponentCard title="Lista de Productos">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Select
                options={options}
                placeholder="N°. Items"
                onChange={handleSelectChange}
                className="dark:bg-dark-900 xl:w-[120px]"
                defaultValue="10"
              />
              <Button size="sm" variant="primary">
                Agregar Nuevo
              </Button>
            </div>
            <div className="relative">
              <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar..."
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[250px]"
              />
            </div>
          </div>
          <ProductDataTable products={data} openModal={openModal} />
        </ComponentCard>
      </div>
      {/*MODAL DE EDICIÓN */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-6">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar Producto
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
                        value={message}
                        onChange={(value) => setMessage(value)}
                        placeholder="Nombre del Producto"
                        rows={2}
                      />
                    </div>
                    <div className="flex flex-row gap-2">
                      <div>
                        <Label>Precio</Label>
                        <Input type="text" value="" />
                      </div>
                      <div>
                        <Label>Descuento</Label>
                        <Input type="text" value="" />
                      </div>
                      <div>
                        <Label>Stock</Label>
                        <Input type="text" value="" />
                      </div>
                    </div>
                    <div className="pt-2 flex flex-row gap-2 justify-between">
                      <div className="w-5/7">
                        <Label>Marca</Label>
                        <Select
                          options={options}
                          placeholder="Seleccione una marca"
                          onChange={handleSelectChange}
                          className="dark:bg-dark-900"
                        />
                      </div>
                      <div className="my-auto pt-5">
                        <Switch
                          label="Producto Activo"
                          defaultChecked={true}
                          onChange={handleSwitchChange}
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
                    options={multiOptions}
                    defaultSelected={["1", "3"]}
                    onChange={(values) => setSelectedValues(values)}
                  />
                  <p className="sr-only">
                    Selected Values: {selectedValues.join(", ")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cerrar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      {/*MODAL PARA IMÁGENES */}
      {/* <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="pt-3">
          <DropzoneComponent />
        </div>
      </Modal> */}
    </>
  );
}
