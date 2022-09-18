import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
   <div className="skeleton-box">
       <ContentLoader
           speed={2}
           width={290}
           height={400}
           viewBox="0 0 290 400"
           backgroundColor="#f3f3f3"
           foregroundColor="#c2c1c1">
           <rect x="3" y="5" rx="0" ry="0" width="280" height="170"/>
           <rect x="18" y="157" rx="0" ry="0" width="63" height="57"/>
           <rect x="92" y="187" rx="0" ry="0" width="130" height="15"/>
           <rect x="-34" y="233" rx="0" ry="0" width="333" height="41"/>
           <rect x="-2" y="289" rx="0" ry="0" width="312" height="38"/>
           <rect x="-27" y="350" rx="0" ry="0" width="317" height="38"/>
           <rect x="170" y="326" rx="0" ry="0" width="1" height="13"/>
       </ContentLoader>
   </div>
)

export default Skeleton
