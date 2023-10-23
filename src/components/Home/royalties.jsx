import React from "react";
import { FaCheck } from "react-icons/fa";
import { MiniButton } from "../General/Button";

export default function Royalties() {
  return (
    <section id="royalties" className="text-center mb-7">
      <h2 className="black bold" style={{ marginRight: "10px" }}>
        {" "}
        Show Your <span className="fw-bold red"> Best Artworks</span>
      </h2>
      <h2 className="black">
        And Get Your <span className="blue">Royalties</span>
      </h2>
      <div className="container mt-4 ">
        <div className="row justify-content-center align-items-center"> {/* Added align-items-center */}
          <div className="col-md-6 d-flex flex-column justify-content-center" style={{ flex: 1 }}> {/* Updated flex-col to d-flex flex-column */}
            <h3>Premium Accounts</h3>
            <h6>Unlock all features. No engagement: You can stop anytime</h6>

            <ul className="list-none mt-5">
              <li className="mb-2">
                <FaCheck className="inline-block text-red-600" /> Free learning
                materials
              </li>
              <li className="mb-2">
                <FaCheck className="inline-block text-red-600" /> Get royalties
                up to 95%
              </li>
              <li className="mb-2">
                <FaCheck className="inline-block text-red-600" /> Artworks Legal
                protection
              </li>
            </ul>
          </div>
          <div className="col-md-6 sm:w-1/2 mt-4 sm:mt-0" style={{ flex: 1 }} >
            <div style={{backgroundColor: "#FFF5F5"}} className="py-5"> 
              <div>
                <h3 className="bold mb-4 ">Pricing</h3>
                
                <div className="text-center">
                  <h4>Monthly</h4>
                  <p>IDR 100,000.00/Month</p>
                  <div className="flex justify-center mt-8">
                    <MiniButton to="" title="Upgrade" className="mx-auto" />
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <div className="text-center items-center">
                  <h4>Annually</h4>
                  <p>IDR 1,000,000.00/Year</p>
                  <div className="flex justify-center mt-8">
                    <MiniButton to="" title="Upgrade" className="mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
