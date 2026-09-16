"use client";

import React, { forwardRef, useState } from "react";
import { ColorType } from "util/theme";
import { Checkbox } from "../checkbox";
import { Icon, type IconSlot, renderIcon } from "../icon/Icon";
import { Text } from "../text";
import styles from "./TreeView.module.css";

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: IconSlot;
  badge?: React.ReactNode;
  disabled?: boolean;
  children?: TreeNode[];
}

export interface TreeViewProps extends Omit<
  React.HTMLAttributes<HTMLUListElement>,
  "onSelect" | "color"
> {
  data: TreeNode[];
  color?: ColorType;
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /* 싱글 선택. checkable과 함께 써도 된다 */
  selected?: string | null;
  onSelect?: (id: string) => void;
  /* 체크박스형. checked에는 leaf id만 들어가고 부모는 자식 상태로 계산한다 */
  checkable?: boolean;
  checked?: string[];
  onCheckedChange?: (ids: string[]) => void;
}

const leafIds = (node: TreeNode): string[] =>
  node.children?.length ? node.children.flatMap(leafIds) : [node.id];

const toggleId = (ids: string[], id: string) =>
  ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];

const TreeView = forwardRef<HTMLUListElement, TreeViewProps>(
  (
    {
      data,
      color,
      expanded,
      defaultExpanded = [],
      onExpandedChange,
      selected,
      onSelect,
      checkable,
      checked = [],
      onCheckedChange,
      className,
      ...rest
    },
    ref,
  ) => {
    const [innerExpanded, setInnerExpanded] = useState(defaultExpanded);
    const expandedIds = expanded ?? innerExpanded;
    const setExpanded = (ids: string[]) => {
      setInnerExpanded(ids);
      onExpandedChange?.(ids);
    };

    const toggleCheck = (node: TreeNode) => {
      const leaves = leafIds(node);
      const allChecked = leaves.every((id) => checked.includes(id));
      const rest = checked.filter((id) => !leaves.includes(id));
      onCheckedChange?.(allChecked ? rest : [...rest, ...leaves]);
    };

    const renderNode = (node: TreeNode, depth: number) => {
      const hasChildren = !!node.children?.length;
      const isOpen = expandedIds.includes(node.id);
      const leaves = leafIds(node);
      const checkedCount = leaves.filter((id) => checked.includes(id)).length;
      const isChecked = checkedCount === leaves.length;

      return (
        <li
          key={node.id}
          role="treeitem"
          aria-expanded={hasChildren ? isOpen : undefined}
          aria-selected={selected === node.id || undefined}
          aria-disabled={node.disabled || undefined}
          className={styles.item}
        >
          <div
            className={styles.row}
            data-selected={selected === node.id || undefined}
            data-disabled={node.disabled || undefined}
            style={{ "--depth": depth } as React.CSSProperties}
          >
            {hasChildren ? (
              <button
                type="button"
                className={styles.toggle}
                aria-label={isOpen ? "접기" : "펼치기"}
                disabled={node.disabled}
                onClick={() => setExpanded(toggleId(expandedIds, node.id))}
              >
                <Icon
                  name={isOpen ? "chevron-down" : "chevron-right"}
                  size={16}
                />
              </button>
            ) : (
              <span className={styles.toggle} />
            )}
            {checkable && (
              <Checkbox
                color={color}
                checked={isChecked}
                indeterminate={!isChecked && checkedCount > 0}
                disabled={node.disabled}
                onChange={() => toggleCheck(node)}
              />
            )}
            <button
              type="button"
              className={styles.content}
              disabled={node.disabled}
              onClick={() => onSelect?.(node.id)}
            >
              {renderIcon(node.icon)}
              <Text truncate>{node.label}</Text>
              {node.badge}
            </button>
          </div>
          {hasChildren && isOpen && (
            <ul role="group" className={styles.group}>
              {node.children!.map((child) => renderNode(child, depth + 1))}
            </ul>
          )}
        </li>
      );
    };

    return (
      <ul
        ref={ref}
        role="tree"
        className={[styles.tree, className].filter(Boolean).join(" ")}
        data-color={color}
        {...rest}
      >
        {data.map((node) => renderNode(node, 0))}
      </ul>
    );
  },
);

TreeView.displayName = "TreeView";

export default TreeView;
