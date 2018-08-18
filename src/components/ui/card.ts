import styled from 'react-emotion';

interface CardProps {
  hover?: boolean;
  width?: string;
  height?: string;
}

export const Card = styled('div')<CardProps>(
  {
    fontSize: '1rem',
    padding: '1rem',
    margin: '1rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '2px',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
  },
  props => ({
    width: props.width,
    height: props.height,
    '&:hover': {
      boxShadow: props.hover
        ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);'
        : '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    },
  })
);

export const CardContainer = styled('div')({
  width: '100%',
  height: '100%',
  textAlign: 'center',
});
