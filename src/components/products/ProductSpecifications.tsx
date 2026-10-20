"use client";

import { useId, useState } from "react";
import type { CatalogSpecificationGroup } from "@/types/productCatalog";
import styles from "./ProductSpecifications.module.css";

type Props = {
  groups: CatalogSpecificationGroup[];
};

export default function ProductSpecifications({ groups }: Props) {
  const instanceId = useId();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (groups.length === 0) return null;

  const activeId = groups.some((group) => group.id === selectedId)
    ? selectedId
    : groups[0].id;

  return (
    <section
      className={styles.specifications}
      aria-labelledby={`${instanceId}-heading`}
    >
      <h2 id={`${instanceId}-heading`} className={styles.heading}>
        Product Specifications
      </h2>

      <div
        className={styles.navigation}
        role="group"
        aria-label="Specification categories"
      >
        {groups.map((group, index) => (
          <button
            key={group.id}
            id={`${instanceId}-button-${index}`}
            type="button"
            className={styles.categoryButton}
            aria-pressed={group.id === activeId}
            aria-controls={`${instanceId}-panel-${index}`}
            onClick={() => setSelectedId(group.id)}
          >
            {group.title}
          </button>
        ))}
      </div>

      {groups.map((group, index) => (
        <div
          key={group.id}
          id={`${instanceId}-panel-${index}`}
          role="region"
          aria-labelledby={`${instanceId}-button-${index}`}
          hidden={group.id !== activeId}
          className={styles.panel}
        >
          <table
            className={styles.table}
            aria-label={`${group.title} specifications`}
          >
            <tbody>
              {group.items.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.label}</th>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}