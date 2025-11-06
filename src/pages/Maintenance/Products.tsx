import { useEffect, useMemo, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Select from "../../components/form/Select";
import ProductDataTable from "../../components/tables/BasicTables/ProductDataTable";
import Button from "../../components/ui/button/Button";
import getDataPaginate from "../../hooks/getDataPaginate";
import { IProduct } from "../../models/ProductDTO";
import Pagination from "../../components/ui/paginate/Pagination";
import PropsPaginate, {
  PAGINATE_INITIAL,
} from "../../components/ui/paginate/paginate";
import ProductCreateModal from "../../components/ui/modal/ProductCreateModal";
import { useModal } from "../../hooks/useModal";

const optionsPaginate = [
  { value: "10", label: "10 Items" },
  { value: "15", label: "15 Items" },
  { value: "20", label: "20 Items" },
  { value: "25", label: "25 Items" },
];

export default function Products() {
  const {
    openModal: openCreateModal,
    closeModal: closeCreateModal,
    isOpen: isOpenCreate,
  } = useModal();
  const [paginate, setPaginate] = useState<PropsPaginate>(PAGINATE_INITIAL);
  const [sort, setSort] = useState<string>("");
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debounceSort, setDebounceSort] = useState<string>("");
  const [showLoader, setShowLoader] = useState(true);
  const [hideAnimation, setHideAnimation] = useState(false);


  const fetchUrl = useMemo(() => {
    return `http://localhost:3000/api/products?page=${paginate.currentPage}&limit=${paginate.numberPages}&sort=${debounceSort}&search=${debouncedSearch}`;
  }, [
    paginate.currentPage,
    paginate.numberPages,
    debounceSort,
    debouncedSearch,
  ]);
  const { data, loading, error, refetch, total } =
    getDataPaginate<IProduct[]>(fetchUrl);
  const [numberPages, setNumberPages] = useState("10");

  // Solo inicializa una vez
  useEffect(() => {
    if (data) {
      setPaginate((prev) => ({
        ...prev,
        numberResults: data.length,
        totalResults: total,
        onUpdatePage: (page: number) => {
          setPaginate((prev) => ({ ...prev, currentPage: page }));
        },
      }));
      setProducts(data);
    }
  }, [data, total]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search); // actualiza solo después de un pequeño delay
    }, 600); // puedes ajustar el tiempo (ms)

    return () => clearTimeout(timeout); // limpia el timeout si el usuario sigue escribiendo
  }, [search]);

  useEffect(() => {
    setTimeout(() => {
      setDebounceSort(sort);
    }, 500);
  }, [sort]);

  useEffect(() => {
    setPaginate((prev) => ({
      ...prev,
      currentPage: 1, // ← reinicia la página
    }));
  }, [debounceSort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideAnimation(true); // activa animación de salida

      // espera que termine la animación antes de ocultar el loader
      setTimeout(() => {
        setShowLoader(false);
      }, 500); // duración de la animación de salida
    }, 1000); // mínimo 1 segundo de carga

    return () => clearTimeout(timer);
  }, []);

  const updateProductInList = (updated: IProduct) => {
    setProducts((prev) =>
      prev ? prev.map((p) => (p.id === updated.id ? updated : p)) : null
    );
  };

  function toggleSort(field: string) {
    setSort((prev) => {
      const [currentField, currentDir] = prev.split(":");
      if (currentField === field) {
        return `${field}:${currentDir === "asc" ? "desc" : "asc"}`;
      }
      return `${field}:asc`;
    });
  }

  function handleSelectChange(value: string) {
    const numPages = parseInt(value);
    if (paginate.numberPages === numPages) return;

    setNumberPages(value);
    setPaginate((prev) => ({
      ...prev,
      numberPages: numPages,
      currentPage: 1,
    }));
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Productos" />
      {/*TABLA DE PRODUCTOS*/}
      <div className="space-y-6">
        <ComponentCard title="Lista de Productos">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Select
                options={optionsPaginate}
                placeholder="N°. Items"
                onChange={(e) => handleSelectChange(e)}
                className="dark:bg-dark-900 xl:w-[120px]"
                value={numberPages}
              />
              <Button
                size="sm"
                variant="primary"
                onClick={() => openCreateModal()}
              >
                Agregar
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
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[250px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {products != null && !showLoader ? (
            <>
              <ProductDataTable
                products={products}
                onUpdate={(p) => updateProductInList(p)}
                loading={loading}
                onSortChange={toggleSort}
                sort={sort}
                refetch={refetch}
              />
              <Pagination paginate={paginate} />
            </>
          ) : (
            <div
              className={`pointer-events-none fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50 ${
                hideAnimation ? "slide-up-fade-out" : "slide-down"
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-700 dark:text-white text-lg font-medium">
                  Cargando, por favor espera...
                </p>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
      {/*MODAL DE CREACIÓN */}
      <ProductCreateModal
        isOpen={isOpenCreate}
        closeModal={closeCreateModal}
        refetch={refetch}
      />
    </>
  );
}
