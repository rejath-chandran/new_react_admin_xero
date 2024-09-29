import { Tabs,TabsList} from "@/components/ui/tabs";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchStaff } from "../../api/services/staff";
import { useAuth } from "../../components/AuthProvider";
import { DataTable } from "@/components/DataTable";
import { ServiceAdd } from "@/components/Admin/ServiceAdd";
import Header from "@/components/Admin/Header";
import StaffEdit from "@/components/Admin/StaffEdit";

const ITEMS_PER_PAGE = 4;
interface Service {
  id: string;
  service_name: string;
  description: string;
}


export const Staff = () => {
  
  const { handleLogout } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery<Service[]>({
    queryKey: ["staff", searchTerm],
    queryFn: () => fetchStaff(searchTerm),
    enabled: true,
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    refetch();
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingService) {
      setIsEditDialogOpen(false);
      setEditingService(null);
      refetch(); 
    }
  };

  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const paginatedServices = services.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-2">
       <Header name="Staff" handleSearchChange={handleSearchChange} handleLogout={handleLogout} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <ServiceAdd />
              </div>
            </div>
            <DataTable
            name="Staff"
            description="List of staff"
            heading={["Name","Email","Role","Company Code","status"]}
            isLoading={isLoading}
            services={services}
            currentPage={currentPage}
            totalPages={totalPages}
            handleEditClick={handleEditClick}
            paginatedServices={paginatedServices}
            setCurrentPage={setCurrentPage}
            />
          </Tabs>
        </main>
      </div>
      <StaffEdit name="Attacks" isEditDialogOpen={isEditDialogOpen} setIsEditDialogOpen={setIsEditDialogOpen} editingStaff={editingService} setEditingStaff={setEditingService} handleEditSave={handleEditSave} editingService={editingService} setEditingService={setEditingService} />
    </div>
    </>
  );
};
