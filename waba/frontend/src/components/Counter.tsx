import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/store/slices/counterSlice";

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Redux Counter</CardTitle>
        <CardDescription>
          A simple counter demonstrating Redux Toolkit with TypeScript
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{count}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => dispatch(decrement())}
            className="flex-1"
          >
            Decrease
          </Button>
          <Button onClick={() => dispatch(increment())} className="flex-1">
            Increase
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => dispatch(incrementByAmount(5))}
            className="flex-1"
          >
            +5
          </Button>
          <Button
            variant="secondary"
            onClick={() => dispatch(incrementByAmount(-5))}
            className="flex-1"
          >
            -5
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
