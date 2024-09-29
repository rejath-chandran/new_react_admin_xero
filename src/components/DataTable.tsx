import {
    ChevronLeft,
    ChevronRight,
  
    MoreHorizontal,
    Pencil,
    Trash,
    
  } from "lucide-react";
  
  
  
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { TabsContent } from "@/components/ui/tabs";
  
 
  
interface DataTableProps{
name:string;
description:string;
heading:string[];
isLoading:boolean;
services:any[];
currentPage:number;
totalPages:number;
handleEditClick:(service:any)=>void;
paginatedServices:any[];
setCurrentPage:(page:any)=>void;
}
const ITEMS_PER_PAGE = 4;


export const DataTable = ({name,description,heading,isLoading,services,currentPage,totalPages,handleEditClick,paginatedServices,setCurrentPage}:DataTableProps) => {
  return (
    <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {
                            heading.map((head)=>(
                                <TableHead>{head.toUpperCase()}</TableHead>
                            ))
                        }
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center">
                            Loading...
                          </TableCell>
                        </TableRow>
                      ) : paginatedServices.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center">
                            No {name} found
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedServices.map((service: any) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">
                              {name === "Attacks" ? service.attack_name :name === "Staff" ? service.user.first_name + " " + service.user.last_name : service.service_name}
                            </TableCell>
                            <TableCell>{name === "Staff" ? service.user.email : service.description}</TableCell>
                            {name === "Staff"&&
                              <>
                              <TableCell>{name === "Staff" ? service.user.role :""}</TableCell>
                              <TableCell>{name === "Staff" ? service.user.company_code :""}</TableCell>
                              <TableCell>{name === "Staff" ? service.user.is_active ? "Active" : "Inactive" :""}</TableCell>
                              </>
                              
                              }
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => handleEditClick(service)}
                                  >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  {!isLoading && services.length > 0 && (
                    <div className="flex items-center justify-between space-x-2 py-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                        {Math.min(
                          currentPage * ITEMS_PER_PAGE,
                          services.length,
                        )}{" "}
                        of {services.length} items
                      </div>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev:any) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">Previous page</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev:any) =>
                              Math.min(prev + 1, totalPages),
                            )
                          }
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Next page</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
  )
}
