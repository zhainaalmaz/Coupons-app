import React, { FC, useEffect } from "react";
import Navigation from "../../UI/Navigation/Navigation";
import styles from "./Help.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { asyncHelpInfo } from "../../store/slices/helpInfoSlice/helpInfoSlice";
import AccordionHelp from "../../UI/Accordion/Accordion";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";

interface InputWrapperProps {
  children?: React.ReactNode;
}

const HelpPage: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.help.data);
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    dispatch(asyncHelpInfo());
  }, []);

  return (
    <>
      <BreadCrumps />
      <div className={styles.layout}>
        <div className="container">
          <div className={styles.wrapper}>
            <Navigation />
            <div className={styles.accordions}>
              <h2>Помощь</h2>
              <div>
                {data.map((item: InputWrapperProps, idx: number) => (
                  <AccordionHelp
                    key={idx}
                    item={item}
                    id={idx}
                    expanded={expanded}
                    handleChange={handleChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpPage;
