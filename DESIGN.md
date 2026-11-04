---
name: AILearn 課前需求問卷
description: 綠白分段表單，清楚呈現選項、進度與填答狀態。
colors:
  bg: "#f3f6f5"
  paper: "#fff"
  ink: "#183b35"
  secondary: "#4a605b"
  accent: "#176354"
  accent-hover: "#104a3e"
  soft: "#e2eee9"
  line: "#c5d2cd"
  error: "#a72830"
  error-bg: "#fff0f0"
  placeholder: "#64746f"
typography:
  body:
    fontFamily: '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", sans-serif'
    fontSize: "17px"
    lineHeight: 1.8
  title:
    fontSize: "26px"
    lineHeight: 1.5
    letterSpacing: "-.02em"
  question:
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.65
  input:
    fontSize: "16px"
    lineHeight: 1.65
  button:
    fontWeight: 700
    lineHeight: 1.6
rounded:
  surface: "14px"
  control: "9px"
  button: "8px"
  tag: "4px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  question: "34px"
  actions: "36px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "13px 23px"
    typography: "{typography.button}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "13px 23px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    typography: "{typography.input}"
  choice-selected:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  form-surface:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.surface}"
    padding: "34px 38px"
---

# 問卷介面設計

## Overview

以清楚、親切的綠白表單承接 AI 初學者的想法。四個階段依序呈現，讓使用者專注目前題目；狀態、提示與錯誤均出現在相關操作附近。

## Colors

主色 `accent` 用於主要操作、已選選項與目前階段；`soft` 承接選取狀態與提示。`paper` 表單置於 `bg` 頁面上，`ink` 與 `secondary` 區分題目及說明，`line` 界定輸入範圍。`error` 與 `error-bg` 配合文字說明傳達錯誤，不只依賴顏色。

## Typography

以繁體中文無襯線字體為主，沿用前言的粗體大標與表單內的清楚層級。桌機內文字級採 `body`，手機降至 16px；輸入欄位維持 `input` 的 16px，避免手機輸入時自動放大。題目加粗，補充提示與字數採較小字級。

## Layout

頁面主區最大寬度 1096px，問卷單欄最大寬度 840px。前言在桌機與平板使用雙欄，600px 以下改單欄；表單只顯示目前階段，不留空側欄。選項於桌機與平板排列雙欄，600px 以下改為單欄。800px 以下收緊表單內距，手機再降為上下 23px、左右 18px；操作按鈕可換行，前進或送出按鈕展寬。

## Elevation & Depth

不使用陰影。以白色表單、淡綠提示、細邊框及留白建立層次。鍵盤焦點使用主色 3px 外框與偏移，選項列的焦點同步呈現在整列。

## Shapes

表單與提示外層採 `surface` 圓角，選項及文字輸入採 `control`，按鈕採 `button`，必填與選填標記採 `tag`。維持實際原生單選及複選控制項，整列選項皆可點選。

## Components

- 主要按鈕最小高度 52px，滑入改深綠，按下時下移 1px；次要按鈕使用白底細框。
- 選項以邊框呈現可操作範圍，選取後加淡綠底及主色框；狀態保留原生控制項辨識。
- 輸入欄位寬度填滿可用空間，文字區最小高度 120px，可垂直調整。
- 階段導覽使用目前階段的粗體與主色，已完成階段加勾號，細進度條提供額外定位。
- 欄位錯誤保留題目旁說明與外框；送出狀態與成功畫面依實際結果顯示。此文件不代表 Google 收件串接已完成。
- 新階段使用短暫淡入與位移；`prefers-reduced-motion` 開啟時停用動畫、轉場與平滑捲動。

## Do's and Don'ts

- 維持單一填答主軸與清楚的必填、選填及複選上限提示。
- 保留鍵盤焦點、整列選取與手機 16px 輸入字級。
- 依可用寬度重排內容，不建立空側欄或遮擋操作的浮動工具列。
- 使用明確文字表達儲存、錯誤與送出狀態，不以裝飾取代狀態說明。
