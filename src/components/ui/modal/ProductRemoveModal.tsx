import { Modal } from "./Modal";
import Button from "../button/Button";
import { AlertIcon } from "../../../icons";

interface PropsModal {
  productId: number,
  text: string,
  isOpen: boolean;
  refetch: () => void;
  closeModal: () => void;
}

export default function ProductRemoveModal({
  isOpen,
  closeModal,
  refetch,
  text,
  productId
}: PropsModal) {
  const handleSubmit = async() => {
    try {
      const response = await fetch(`/api/products/remove/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }
      closeModal();
      refetch();
      console.log("Producto eliminado correctamente");
      // Aquí puedes actualizar tu estado o recargar la lista
    } catch (error: unknown) {
      console.error("Error:", error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
      <div className="relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-6">
        <div className="px-2 justify-items-center">
          <AlertIcon className="size-1/4" />
        </div>
        <form className="flex flex-col">
          <div className="custom-scrollbar h-[120px] overflow-y-auto px-2 pb-3">
            <div>
              <h5 className="mb-5 pt-2 text-center text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                ¿Está seguro que desea eliminar el producto {text}?
              </h5>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                No podrá revertir los cambios despues!
              </p>
            </div>
          </div>
          <div className="flex gap-3 px-2 mt-6 lg:justify-center">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cerrar
            </Button>
            <Button size="sm" type="button" onClick={() => handleSubmit()}>
              Eliminar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
