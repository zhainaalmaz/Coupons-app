import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
  item?: any;
  id: number;
  expanded: any;
  handleChange: any;
}

const AccordionHelp = ({ item, id, expanded, handleChange }: IProps) => {

  return (
    <div id={id + ''}>
      <p></p>
      <Accordion
        style={{
          border: '1px solid #D4E3FF',
          borderRadius: '12px',
          boxShadow: 'none',
        }}
        expanded={expanded === 'panel' + id}
        onChange={handleChange('panel' + id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: '#054EDB' }} />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{ color: '#171717', fontWeight: 700, fontSize: '15px' }}
          >
            {item.question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{item.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionHelp;
