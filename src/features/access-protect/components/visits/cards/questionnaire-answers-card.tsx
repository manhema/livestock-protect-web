import Card from '@mui/material/Card';
import React, { type FC, useState } from 'react';
import type { VisitModel } from '../../../services/models/visit-model.ts';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Markdown from 'react-markdown';

export const QuestionnaireItem = ({
  question,
  answer,
}: {
  question: string | React.ReactNode;
  answer?: string;
}) => {
  return (
    <Card variant="outlined" sx={{ my: 2, p: 0 }} data-testid="questionnaire-item">
      <CardContent>
        <Typography component="div" data-testid="questionnaire-item-question">{question}</Typography>
        <Divider sx={{ mx: 0, my: 1 }} />
        <Typography data-testid="questionnaire-item-answer">
          Answer:
          {' '}
          {answer}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface QuestionnaireAnswersCardProps {
  questionnaire?: VisitModel['questionnaire'];
}

export const QuestionnaireAnswersCard : FC<QuestionnaireAnswersCardProps> = ({ questionnaire }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <React.Fragment>
      <Card
        sx={{
          p: { xs: 0, md: 2 },
          mb: 2,
        }}
      >
        <CardActions disableSpacing>
          <Typography variant="caption" textAlign="right" data-testid="questionnaire-card-title">
            Questionnaire
          </Typography>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            data-testid="questionnaire-card-expand-button"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>

      <Collapse in={expanded}>
        {questionnaire?.map((data, index) => (
          <QuestionnaireItem
            key={index}
            question={<Markdown>{data.question}</Markdown>}
            answer={data.answer}
          />
        ))}
      </Collapse>
    </React.Fragment>
  );
};
