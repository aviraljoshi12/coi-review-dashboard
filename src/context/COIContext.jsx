import { createContext, useContext, useEffect, useState } from "react";
import { COI_DATA } from "../data/coiData";

const COIContext = createContext();

export function COIProvider({ children }) {
  const [cois, setCois] = useState(() => {
    const saved = localStorage.getItem("cois");
    return saved ? JSON.parse(saved) : COI_DATA;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expiryFilter, setExpiryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [propertyFilter, setPropertyFilter] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({
    property: true,
    tenant: true,
    unit: true,
    coiName: true,
    expiry: true,
    status: true,
    reminder: true,
  });

  const filteredCois = [...cois]
    .filter((coi) => {
      const searchMatch =
        coi.property.toLowerCase().includes(search.toLowerCase()) ||
        coi.tenantName.toLowerCase().includes(search.toLowerCase()) ||
        coi.unit.toLowerCase().includes(search.toLowerCase());

      const statusMatch = statusFilter === "All" || coi.status === statusFilter;

      const propertyMatch =
        propertyFilter.length === 0 || propertyFilter.includes(coi.property);

      let expiryMatch = true;
      if (expiryFilter === "30") {
        const expiry = new Date(coi.expiryDate);
        const today = new Date();
        const in30Days = new Date();
        in30Days.setDate(today.getDate() + 30);
        expiryMatch = expiry >= today && expiry <= in30Days;
      }

      return searchMatch && statusMatch && expiryMatch && propertyMatch;
    })
    .sort((a, b) => {
      if (!sortOrder) return 0;
      const dateA = new Date(a.expiryDate);
      const dateB = new Date(b.expiryDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const totalPages = Math.max(1, Math.ceil(filteredCois.length / rowsPerPage));

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedCois = filteredCois.slice(startIndex, endIndex);

  // ACTIONS

  const updateStatus = (id, status) => {
    setCois((prev) =>
      prev.map((coi) => (coi.id === id ? { ...coi, status } : coi)),
    );
  };

  const updateExpiryDate = (id, expiryDate) => {
    setCois((prev) =>
      prev.map((coi) => (coi.id === id ? { ...coi, expiryDate } : coi)),
    );
  };

  const deleteCOI = (id) => {
    setCois((prev) => prev.filter((coi) => coi.id !== id));
  };

  const toggleSelectAll = (ids) => {
    setSelectedIds((prev) => (prev.length === ids.length ? [] : ids));
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const addCOI = (newCOI) => {
    setCois((prev) => [
      ...prev,
      {
        ...newCOI,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        reminderStatus: "Not Sent",
      },
    ]);
  };

  const bulkSendReminder = () => {
    setCois((prev) =>
      prev.map((c) =>
        selectedIds.includes(c.id) ? { ...c, reminderStatus: "Sent (30d)" } : c,
      ),
    );
  };

  const hasPendingReminders = cois.some(
    (c) => selectedIds.includes(c.id) && c.reminderStatus !== "Sent (30d)",
  );

  useEffect(() => {
    localStorage.setItem("cois", JSON.stringify(cois));
  }, [cois]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <COIContext.Provider
      value={{
        cois,
        setCois,
        updateStatus,
        deleteCOI,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        expiryFilter,
        setExpiryFilter,
        filteredCois,
        sortOrder,
        setSortOrder,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        setRowsPerPage,
        totalPages,
        paginatedCois,
        propertyFilter,
        setPropertyFilter,
        toggleSelectAll,
        toggleSelectOne,
        selectedIds,
        updateExpiryDate,
        addCOI,
        visibleColumns,
        setVisibleColumns,
        bulkSendReminder,
        hasPendingReminders,
      }}
    >
      {children}
    </COIContext.Provider>
  );
}

export const useCOI = () => useContext(COIContext);
