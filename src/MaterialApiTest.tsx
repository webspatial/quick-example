import { useEffect, useState } from "react";
import styled from "styled-components";
import "./material.css";
import type { CSSProperties } from "react";

type XRAttrs = { "enable-xr"?: boolean; "enable-xr-monitor"?: boolean };

const StyledPanel = styled.div<XRAttrs & { $hidden?: boolean; $pos?: boolean; $back?: number }>`
  min-height: 160px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  --xr-back: ${(p) => (typeof p.$back === "number" ? p.$back : 50)};
  visibility: ${(p) => (p.$hidden ? "hidden" : "visible")};
  position: ${(p) => (p.$pos ? "absolute" : "static")};
  top: ${(p) => (p.$pos ? "12px" : "auto")};
  left: ${(p) => (p.$pos ? "12px" : "auto")};
  margin: ${(p) => (p.$pos ? "8px" : "0")};
`;

export default function MaterialApiTest() {
  const [classHidden, setClassHidden] = useState(false);
  const [classPos, setClassPos] = useState(false);
  const [inlineHidden, setInlineHidden] = useState(false);
  const [inlinePos, setInlinePos] = useState(false);
  const [styledHidden, setStyledHidden] = useState(false);
  const [styledPos, setStyledPos] = useState(false);
  const backs = [0, 20, 50, 100] as const;
  const [back, setBack] = useState<(typeof backs)[number]>(50);

  useEffect(() => {
    const classEl = document.getElementById("classPanelEl");
    const inlineEl = document.getElementById("inlinePanelEl");
    const styledEl = document.getElementById("styledPanelEl");
    const logVars = (el: Element | null, label: string) => {
      if (!el) return;
      const cs = getComputedStyle(el as HTMLElement);
      console.log(`[${label}] visibility=`, cs.getPropertyValue("visibility").trim());
      console.log(`[${label}] position=`, cs.getPropertyValue("position").trim());
      console.log(`[${label}] top=`, cs.getPropertyValue("top").trim());
      console.log(`[${label}] left=`, cs.getPropertyValue("left").trim());
      console.log(`[${label}] margin=`, cs.getPropertyValue("margin").trim());
      console.log(`[${label}] transform=`, cs.getPropertyValue("transform").trim());
    };
    const attrObserver = new MutationObserver(muts => {
      muts.forEach(m => {
        if (m.type === "attributes") {
          const target = m.target as HTMLElement;
          const which = m.attributeName;
          console.log(`[MutationObserver] ${target.id || target.tagName} attribute changed:`, which);
          logVars(target, target.id || target.tagName);
        }
      });
    });
    if (classEl) {
      attrObserver.observe(classEl, { attributes: true, attributeFilter: ["class", "style"] });
      logVars(classEl, "classPanelEl:init");
    }
    if (inlineEl) {
      attrObserver.observe(inlineEl, { attributes: true, attributeFilter: ["class", "style"] });
      logVars(inlineEl, "inlinePanelEl:init");
    }
    if (styledEl) {
      attrObserver.observe(styledEl, { attributes: true, attributeFilter: ["class", "style"] });
      logVars(styledEl, "styledPanelEl:init");
    }
    const headObserver = new MutationObserver(muts => {
      muts.forEach(m => {
        console.log(`[HeadObserver] change:`, m.type, m.attributeName || "");
      });
    });
    headObserver.observe(document.head, { attributes: true, childList: true, subtree: true });
    return () => {
      attrObserver.disconnect();
      headObserver.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14 }}>Class-based</p>
          <div
            enable-xr
            enable-xr-monitor
            id="classPanelEl"
            className={(classHidden ? "notvisible " : "") + (classPos ? "userPos " : "") + `z${back}`}
            style={
              {
                minHeight: 160,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              } as unknown as CSSProperties
            }>
            <span>class</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14 }}>Inline style</p>
          <div
            enable-xr
            enable-xr-monitor
            id="inlinePanelEl"
            style={
              {
                minHeight: 160,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ["--xr-back"]: back,
                visibility: inlineHidden ? "hidden" : "visible",
                position: inlinePos ? "absolute" : "static",
                top: inlinePos ? 12 : "auto",
                left: inlinePos ? 12 : "auto",
                margin: inlinePos ? 8 : 0,
              } as unknown as CSSProperties
            }>
            <span>inline</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14 }}>Styled-components</p>
          <StyledPanel id="styledPanelEl" enable-xr enable-xr-monitor $hidden={styledHidden} $pos={styledPos} $back={back}>
            <span>styled</span>
          </StyledPanel>
        </div>
      </div>
      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div>
          <label>
            <span>Class: hidden</span>
            <input
              type="checkbox"
              checked={classHidden}
              onChange={e => setClassHidden(e.target.checked)}
              style={{ marginLeft: 6 }}
            />
          </label>
          <label style={{ marginLeft: 12 }}>
            <span>Class: position</span>
            <input
              type="checkbox"
              checked={classPos}
              onChange={e => setClassPos(e.target.checked)}
              style={{ marginLeft: 6 }}
            />
          </label>
          <label style={{ marginLeft: 12 }}>
            <span>Back</span>
            <select value={back} onChange={e => setBack(Number(e.target.value) as (typeof backs)[number])} style={{ marginLeft: 6 }}>
              {backs.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            <span>Inline: hidden</span>
            <input
              type="checkbox"
              checked={inlineHidden}
              onChange={e => setInlineHidden(e.target.checked)}
              style={{ marginLeft: 6 }}
            />
          </label>
          <label style={{ marginLeft: 12 }}>
            <span>Inline: position</span>
            <input
              type="checkbox"
              checked={inlinePos}
              onChange={e => setInlinePos(e.target.checked)}
              style={{ marginLeft: 6 }}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Styled: hidden</span>
            <input
              type="checkbox"
              checked={styledHidden}
              onChange={e => setStyledHidden(e.target.checked)}
              style={{ marginLeft: 6 }}
            />
          </label>
          <label style={{ marginLeft: 12 }}>
            <span>Styled: position</span>
            <input
              type="checkbox"
              checked={styledPos}
              onChange={e => setStyledPos(e.target.checked)}
              style={{ marginLeft: 6 }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
