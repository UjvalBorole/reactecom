import React, { useState } from 'react'

const ProductOtherData = (type) => {
  console.log(type.detail)
  
  return (
    <div className="tab-content" id="ex1-content">
    <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
      <p>
       {type.detail.desc == "warrenty"?
       <div className="">year of warrenty: {type.detail.spec}</div>:
       type.detail.desc == "cs"? <div className="">Customer Support Email: {type.detail.spec}</div>:
       type.detail.spec
       }
      </p>
     
      {/* <table className="table border mt-3 mb-2">
        <tr>
          <th className="py-2">Display:</th>
          <td className="py-2">13.3-inch LED-backlit display with IPS</td>
        </tr>
        <tr>
          <th className="py-2">Processor capacity:</th>
          <td className="py-2">2.3GHz dual-core Intel Core i5</td>
        </tr>
        <tr>
          <th className="py-2">Camera quality:</th>
          <td className="py-2">720p FaceTime HD camera</td>
        </tr>
        <tr>
          <th className="py-2">Memory</th>
          <td className="py-2">8 GB RAM or 16 GB RAM</td>
        </tr>
        <tr>
          <th className="py-2">Graphics</th>
          <td className="py-2">Intel Iris Plus Graphics 640</td>
        </tr>
      </table> */}
      {type.detail.desc == "warrenty"?" ":type.detail.desc == "cs"?" ":type.detail.desc}
      
      
    </div>
    
  </div>
  )
}

export default ProductOtherData