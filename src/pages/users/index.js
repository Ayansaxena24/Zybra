import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/zybra.png';
import Image from 'next/image';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpDown, Loader2 } from "lucide-react";

// Simplified animation variants
const containerVariants = {
  hidden: { 
    opacity: 0, 
    x: 0,
    y: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    y: 0,
    transition: { 
      duration: 0.6,
      delay: 0.3 
    }
  }
};

const rowVariants = {
  hidden: { 
    opacity: 0,
    x: -50,
    y: 20
  },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: 0.5 + (i * 0.1),
      duration: 0.4
    }
  })
};

// Fetch function remains the same
const fetchUsers = async (page, limit) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const totalCount = response.headers.get('x-total-count');
  const data = await response.json();
  
  return {
    users: data,
    totalPages: Math.ceil(parseInt(totalCount) / limit)
  };
};

const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: "Phone",
  },
  {
    accessorKey: 'website',
    header: "Website",
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState([]);
  const currentPage = parseInt(router.query.page) || 1;
  const itemsPerPage = parseInt(router.query.limit) || 5;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', currentPage, itemsPerPage],
    queryFn: () => fetchUsers(currentPage, itemsPerPage),
    keepPreviousData: true
  });

  const table = useReactTable({
    data: data?.users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    manualPagination: true,
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && (!data?.totalPages || newPage <= data.totalPages)) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: newPage },
      });
    }
  };

  const handleLimitChange = (value) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, limit: value, page: 1 },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-4">
        <Image src={logo} alt="Logo" width={100} height={100} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='py-4'
      >
        <Card>
          <CardHeader>
          <div className='h-[30px]'
          style={{
                background:
                  "repeating-linear-gradient(135deg, #79cf8c, #00bbb9 50%, #8080ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}>
          <CardTitle>User Management</CardTitle>
          </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Input
                placeholder="Search users..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="max-w-sm"
              />
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleLimitChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Items per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row, index) => (
                        <motion.tr
                          key={row.id}
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                          className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">
                  Showing {itemsPerPage} items per page
                </p>
              </div>
              <div className="flex-1 text-sm text-muted-foreground text-center">
                Page {currentPage} of {data?.totalPages || 1}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= (data?.totalPages || 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}