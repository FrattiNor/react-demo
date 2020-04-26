/**
 * 用于生成业务图标
 * 图标字体样式文件在src/icon.less
 * 字体文件在public/fonts目录下
 */
import React from "react";

export default function CoolIcon({ name, size = 14, color, style }) {
  const common = (
    <i
      aria-hidden="true"
      className={`projectIcon project-icon-${name}`}
      style={{ ...style, fontSize: size, color }}
    />
  );

  return common;
}
