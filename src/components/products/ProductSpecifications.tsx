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
      className={styles.section}
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
        {groups.map((group, index) => {
          const active = group.id === activeId;

          return (
            <button
              key={group.id}
              id={`${instanceId}-button-${index}`}
              type="button"
              className={styles.button}
              aria-pressed={active}
              aria-controls={`${instanceId}-panel-${index}`}
              onClick={() => setSelectedId(group.id)}
            >
              {group.title}
            </button>
          );
        })}
      </div>

      {groups.map((group, index) => (
        <section
          key={group.id}
          id={`${instanceId}-panel-${index}`}
          aria-labelledby={`${instanceId}-button-${index}`}
          hidden={group.id !== activeId}
          className={styles.panel}
        >
          <dl className={styles.list}>
            {group.items.map((item) => (
              <div key={item.id} className={styles.row}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </section>
  );
}