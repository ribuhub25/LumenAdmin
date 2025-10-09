import { useState } from "react";
import { Modal } from ".";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import Label from "../../form/Label";
import Select from "../../form/Select";
import Switch from "../../form/switch/Switch";
import Button from "../button/Button";
import MultiSelect from "../../form/MultiSelect";
import { ProductDTO } from "../../../models/ProductDTO";


const multiOptions = [
    { value: "1", text: "Option 1", selected: false },
    { value: "2", text: "Option 2", selected: false },
    { value: "3", text: "Option 3", selected: false },
    { value: "4", text: "Option 4", selected: false },
    { value: "5", text: "Option 5", selected: false },
];

const options = [
    { value: "10", label: "10 Items" },
    { value: "15", label: "15 Items" },
    { value: "20", label: "20 Items" },
    { value: "25", label: "25 Items" },
];

interface PropsModal {
    product: ProductDTO | null;
    isOpen: boolean;
    closeModal: () => void;
}

export default function ProductModal({ product, isOpen, closeModal }: PropsModal) {
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
                                            value={product?.name}
                                            onChange={(value) => setMessage(value)}
                                            placeholder="Nombre del Producto"
                                            rows={2}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <div>
                                            <Label>Precio</Label>
                                            <Input type="text" value={product?.price} />
                                        </div>
                                        <div>
                                            <Label>Descuento</Label>
                                            <Input type="text" value={product?.discount} />
                                        </div>
                                        <div>
                                            <Label>Stock</Label>
                                            <Input type="text" value={product?.stock} />
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
                                                defaultChecked={ (product?.status == 1 ? true : false ) }
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
    )
}