import { formatBigIntTime } from "./formatTime.js";

export class Benchmark {

  startTime = BigInt(0);

  stopTime = BigInt(0);

  timeTaken = BigInt(0);

  start(): bigint {
    return this.startTime = process.hrtime.bigint();
  }

  stop(): Benchmark {
    const stopTime = process.hrtime.bigint();

    this.timeTaken = stopTime - this.startTime;
    this.stopTime = stopTime;

    return this;
  }

  readable(): string {
    return formatBigIntTime(this.timeTaken);
  }

  display(): string {
    return this.readable();
  }

}
