import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadCNPagination,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationDetails {
  total_pages: number;
  page_size: number;
  total_records: number;
  current_page: number;
}

interface LimitOption {
  title: string;
  value: number;
}

interface PaginationProps {
  capturePageNum: (page: number) => void;
  captureRowPerItems: (limit: number) => void;
  initialPage?: number;
  limitOptionsFromProps?: LimitOption[];
  paginationDetails: PaginationDetails;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  capturePageNum,
  captureRowPerItems,
  initialPage = 1,
  limitOptionsFromProps = [],
  paginationDetails,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [inputPageValue, setInputPageValue] = useState<string>(
    initialPage.toString()
  );
  const [limitOptions, setLimitOptions] = useState<LimitOption[]>([]);

  const totalPages = paginationDetails?.total_pages ?? 1;
  const selectedValue = paginationDetails?.page_size ?? 15;
  const totalRecords = paginationDetails?.total_records ?? 0;

  const lastIndex = currentPage * selectedValue;
  const firstIndex = lastIndex - selectedValue;

  useEffect(() => {
    setLimitOptions(
      limitOptionsFromProps.length
        ? limitOptionsFromProps
        : [
            { title: "10/page", value: 10 },
            { title: "15/page", value: 15 },
            { title: "25/page", value: 25 },
            { title: "100/page", value: 100 },
            { title: "250/page", value: 250 },
            { title: "500/page", value: 500 },
          ]
    );
  }, [limitOptionsFromProps]);

  useEffect(() => {
    if (paginationDetails?.current_page) {
      setCurrentPage(paginationDetails.current_page);
      setInputPageValue(paginationDetails.current_page.toString());
    }
  }, [paginationDetails]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setInputPageValue(page.toString());
      capturePageNum(page);
    }
  };

  const handleRowChange = (newLimit: string) => {
    captureRowPerItems(Number(newLimit));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setInputPageValue(value);
    }
  };

  const onKeyDownInPageChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = Math.max(
        1,
        Math.min(parseInt(inputPageValue) || 1, totalPages)
      );
      handlePageChange(page);
    }
  };

  const getPageNumbers = (): (number | null)[] => {
    const pageNumbers: (number | null)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(null);
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push(null);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push(null);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(null);
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <ShadCNPagination className="flex justify-between items-center px-2 sticky bottom-0 shadow-inner">
      <PaginationContent className="px-1 py-0 flex gap-5">
        <Select
          value={selectedValue?.toString()}
          // onValueChange={handleRowChange}
        >
          <SelectTrigger className="w-24 text-xs py-0 h-6 border-gray-200">
            <SelectValue
              placeholder={`Items per page`}
              className="font-normal text-xs border-gray-200"
            />
          </SelectTrigger>
          <SelectContent className="w-[120px] text-xs bg-white pointer">
            {limitOptions.map((item) => (
              <SelectItem
                value={item.value?.toString()}
                key={item.value}
                className="cursor-pointer font-normal text-xs opacity-90"
              >
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="font-normal text-xs opacity-80">
          {Math.min(firstIndex + 1, totalRecords)} -{" "}
          {Math.min(lastIndex, totalRecords)} of {totalRecords}
        </div>
      </PaginationContent>

      <div className="flex justify-end items-center">
        <PaginationContent className="px-1 py-0">
          <div className="flex items-center font-normal text-xs opacity-80">
            GoTo
            <Input
              value={inputPageValue}
              onChange={handleInputChange}
              onKeyDown={onKeyDownInPageChange}
              className="h-6 w-10 text-center bg-gray-300 text-xs  ml-2"
              placeholder="Page"
            />
          </div>
        </PaginationContent>

        <PaginationContent className="px-1 py-0 font-normal">
          <PaginationItem>
            <PaginationPrevious
              href={currentPage === 1 ? undefined : "#"}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              aria-disabled={currentPage === 1}
              className={
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }
            />
          </PaginationItem>

          {getPageNumbers().map((pageNumber, index) =>
            pageNumber === null ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={pageNumber === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNumber);
                  }}
                  className={`text-xs min-w-6 h-6 px-1.5 ${pageNumber === currentPage ? "bg-gray-300 rounded-full border-gray-200" : ""}`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href={currentPage === totalPages ? undefined : "#"}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              aria-disabled={currentPage === totalPages}
              className={
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </div>
    </ShadCNPagination>
  );
};

export default PaginationComponent;
