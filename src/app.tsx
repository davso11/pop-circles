import { useRef, useState } from 'react';
import { Undo, Redo, RefreshCcw } from 'lucide-react';
import { Playground } from '@/components/playground';
import { Circle } from '@/components/circle';
import { Button } from '@/components/ui/button';
import { Coordinate } from '@/types';

// Sounds
import popSound from '@/assets/pop.mp3';
import undoSound from '@/assets/undo.mp3';
import resetSound from '@/assets/reset.mp3';

export const App = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [stack, setStack] = useState<Coordinate[]>([]);

  const popAudio = useRef(new Audio(popSound)).current;
  const undoAudio = useRef(new Audio(undoSound)).current;
  const resetAudio = useRef(new Audio(resetSound)).current;

  const noCoordinates = coordinates.length < 1;
  const noItemInStack = stack.length < 1;

  const popCircle: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!noItemInStack) {
      setStack([]);
    }
    const { clientX: x, clientY: y } = e;
    popAudio.play();
    setCoordinates((prev) => [...prev, { x, y }]);
  };

  const undo: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    let coordinatesCopy = Array.from(coordinates);
    const [removed] = coordinatesCopy.splice(-1, 1);
    undoAudio.play();
    setStack((prev) => [...prev, removed]);
    setCoordinates(coordinatesCopy);
  };

  const redo: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    const [removed] = stack.splice(-1, 1); // LIFO
    popAudio.play();
    setCoordinates((prev) => [...prev, removed]);
    setStack([...stack]);
  };

  return (
    <Playground onClick={popCircle}>
      {/* Text indicator */}
      {noCoordinates && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <p className="text-center text-muted-foreground">
            Click anywhere to pop a circle...
          </p>
        </div>
      )}

      {/* Actions: undo & redo */}
      <div
        className="absolute left-1/2 top-0 z-[9999] flex -translate-x-1/2 items-center gap-x-3 px-10 pb-10 pt-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          pill
          size="icon"
          onClick={undo}
          disabled={noCoordinates}
          tooltip="Undo"
        >
          <Undo />
        </Button>
        <Button
          pill
          size="icon"
          onClick={redo}
          disabled={noItemInStack}
          tooltip="Redo"
        >
          <Redo />
        </Button>
      </div>

      {coordinates.map((coord, i) => (
        <Circle
          key={i}
          {...coord}
        />
      ))}

      <div
        className="absolute right-0 top-0 pb-10 pl-10 pr-4 pt-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          pill
          size="icon"
          variant="destructive"
          tooltip="Refresh"
          tooltipAlign="end"
          disabled={noCoordinates}
          onClick={(e) => {
            e.stopPropagation();
            resetAudio.play();
            setCoordinates([]);
            setStack([]);
          }}
        >
          <RefreshCcw size={18} />
        </Button>
      </div>
    </Playground>
  );
};
