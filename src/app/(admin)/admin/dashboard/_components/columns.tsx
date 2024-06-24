"use client";
import { BarChart, Check, Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { Button } from "@/components/ui/button";

type GetAllProductOutput =
  inferRouterOutputs<AppRouter>["order"]["getAllOrder"][0];

export const columns: ColumnDef<GetAllProductOutput>[] = [
  {
    accessorKey: "orderCode",
    header: "Order ID",
  },
  {
    accessorKey: "orderDateTime",
    header: "Ordered Date",
    accessorFn: (data) => {
      return data.orderDateTime.toISOString().slice(0, 10);
    }
  },
  {
    id: "Name",
    header: "Name",
    accessorFn: (data) => {
      return `${data.lastName} ${data.firstName}`;
    },
  },

  {
    id: "Total",
    header: "Total",
    accessorFn: (data) => {
      const total = data.orderItems.reduce((total, currItem) => total += (currItem.productPrice * currItem.quantity), 0);
      return `$ ${total}`
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    accessorFn: (data) => {
      return data.status;
    },
    cell: ({row}) => {
      const value: string = row.getValue("status");

      return <div className="bg-orange-400 text-white rounded-sm px-2 w-min">
        {value}
      </div>
    }
  },

  {
    id: "actions",
    cell: ({ row }) => {
      // const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BarChart className="mr-2 h-4 w-4" />
              View  Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Check className="mr-2 h-4 w-4" />
              Mark as Done
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy Order ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }
];
