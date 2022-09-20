import React from "react";
import ContentLoader from "react-content-loader";

const CouponDetaulsSkeleton = () => (
  <ContentLoader
    speed={2}
    width={1200}
    height={470}
    viewBox="0 0 1200 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#c2c1c1"
  >
    <rect x="170" y="326" rx="0" ry="0" width="1" height="13" />
    <rect x="7" y="32" rx="0" ry="0" width="319" height="233" />
    <rect x="346" y="47" rx="0" ry="0" width="57" height="56" />
    <rect x="411" y="66" rx="0" ry="0" width="125" height="23" />
    <rect x="344" y="132" rx="0" ry="0" width="133" height="12" />
    <rect x="343" y="156" rx="0" ry="0" width="202" height="147" />
    <rect x="343" y="328" rx="0" ry="0" width="201" height="133" />
    <rect x="9" y="287" rx="0" ry="0" width="316" height="187" />
  </ContentLoader>
);

export default CouponDetaulsSkeleton;
