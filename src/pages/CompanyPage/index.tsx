import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyDetails } from "../../api/api";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import Company from "../../components/Company";

const CompanyPage = () => {
  const { id } = useParams() as {
    id: string;
  };
  const [companyInfo, setCompanyInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(companyInfo);

  useEffect(() => {
    const getCompanyData = async () => {
      const response = await getCompanyDetails(id);
      setCompanyInfo(response.data);
      setIsLoading(false);
    };
    getCompanyData();
  }, [id]);

  return (
    <>
      <BreadCrumps />
      <div className="container">
        <Company isLoading={isLoading} companyInfo={companyInfo} />
      </div>
    </>
  );
};

export default CompanyPage;
