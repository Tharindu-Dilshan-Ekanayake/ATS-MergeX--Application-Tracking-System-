import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearBuffer(props) {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(props.progress);
        setBuffer(props.buffer);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Calculate progress percentage
  const progressPercentage = Math.round((progress / 100) * 100);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <LinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={buffer}
        sx={{
          '.css-qhoknl-MuiLinearProgress-bar1': {
            backgroundColor: '#EA7122', // Change the color of the progress bar
            
          },
          '.css-1qdnzt4-MuiLinearProgress-bar2': {
            backgroundColor: '#c4c4c4', // Change the color of the buffer bar
          },
        }}
      />
      <span style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', paddingRight: '8px' }}>{progressPercentage}%</span>
    </Box>
  );
}
