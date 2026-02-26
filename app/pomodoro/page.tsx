"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Play, Pause, RotateCcw } from "lucide-react";
import "react-h5-audio-player/lib/styles.css";

const AudioPlayer = dynamic(
  () => import("react-h5-audio-player").then((mod) => mod.default),
  { ssr: false }
);

const FOCUS_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;

type Mode = "focus" | "shortBreak" | "longBreak";

const MODE_CONFIG: Record<Mode, { label: string; seconds: number }> = {
  focus: { label: "Tập trung", seconds: FOCUS_MINUTES * 60 },
  shortBreak: { label: "Nghỉ ngắn", seconds: SHORT_BREAK_MINUTES * 60 },
  longBreak: { label: "Nghỉ dài", seconds: LONG_BREAK_MINUTES * 60 },
};

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const DEFAULT_PAGE_TITLE = "Pomodoro";

function playAlarmSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // Fallback: no sound if AudioContext not supported
  }
}

// Nhạc tập trung (free MP3 / stream)
const FOCUS_TRACKS = [
  { id: "1", title: "Lofi Focus", artist: "SoundHelix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "2", title: "Calm Piano", artist: "SoundHelix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "3", title: "Ambient Study", artist: "SoundHelix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "4", title: "Soft Keys", artist: "SoundHelix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: "5", title: "Quiet Flow", artist: "SoundHelix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { id: "6", title: "Deep Focus", artist: "SoundHelix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { id: "7", title: "Morning Calm", artist: "SoundHelix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { id: "8", title: "Study Room", artist: "SoundHelix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
];

export default function PomodoroPage() {
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(MODE_CONFIG.focus.seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(FOCUS_TRACKS[0]);

  const totalSeconds = MODE_CONFIG[mode].seconds;
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;

  // Cập nhật title tab theo thời gian còn lại
  useEffect(() => {
    const label = MODE_CONFIG[mode].label;
    const timeStr = formatTime(secondsLeft);
    document.title = `${timeStr} · ${label} | ${DEFAULT_PAGE_TITLE}`;
    return () => {
      document.title = DEFAULT_PAGE_TITLE;
    };
  }, [secondsLeft, mode]);

  const resetTimer = useCallback(() => {
    const config = MODE_CONFIG[mode];
    setSecondsLeft(config.seconds);
    setIsRunning(false);
  }, [mode]);

  const switchMode = useCallback((newMode: Mode) => {
    setMode(newMode);
    setSecondsLeft(MODE_CONFIG[newMode].seconds);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextMode: Mode =
            mode === "focus" ? "shortBreak" : mode === "shortBreak" ? "focus" : "focus";
          setIsRunning(false);
          playAlarmSound();
          queueMicrotask(() => {
            setMode(nextMode);
            setSecondsLeft(MODE_CONFIG[nextMode].seconds);
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode]);

  return (
    <section className="pb-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Pomodoro
      </h1>
      <p className="text-muted-foreground mt-2">
        Kỹ thuật quản lý thời gian: 25 phút tập trung, 5 phút nghỉ. Lấy cảm hứng từ{" "}
        <a
          href="https://pomofocus.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          Pomofocus
        </a>
        .
      </p>

      {/* Mode tabs */}
      <div className="flex gap-2 mt-6">
        {(Object.keys(MODE_CONFIG) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {MODE_CONFIG[m].label}
            {m === "focus" && ` (${FOCUS_MINUTES} phút)`}
            {m === "shortBreak" && ` (${SHORT_BREAK_MINUTES} phút)`}
            {m === "longBreak" && ` (${LONG_BREAK_MINUTES} phút)`}
          </button>
        ))}
      </div>

      {/* Timer */}
      <div className="mt-8 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* Progress ring */}
          <svg className="size-64 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress)}`}
              strokeLinecap="round"
              className="text-primary transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-5xl font-bold tabular-nums">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-muted-foreground text-sm mt-1">
              {MODE_CONFIG[mode].label}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => setIsRunning((r) => !r)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {isRunning ? (
              <>
                <Pause className="size-4" /> Tạm dừng
              </>
            ) : (
              <>
                <Play className="size-4" /> Bắt đầu
              </>
            )}
          </button>
          <button
            type="button"
            onClick={resetTimer}
            className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-muted/50"
          >
            <RotateCcw className="size-4" /> Đặt lại
          </button>
        </div>
      </div>

      {/* Focus music - thư viện nhạc với audio player */}
      <div className="mt-12">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Nhạc tập trung
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Chọn bài và bật nhạc nền để giữ focus.
        </p>

        <div className="mt-6 max-w-2xl rounded-xl border bg-card p-4 shadow-sm">
          <div className="mb-4">
            <p className="font-medium">{selectedTrack.title}</p>
            <p className="text-muted-foreground text-sm">{selectedTrack.artist}</p>
          </div>
          <AudioPlayer
            src={selectedTrack.src}
            showJumpControls={false}
            layout="horizontal"
            className="rounded-lg border-0 bg-muted/50 focus:ring-2 focus:ring-primary"
          />
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            {FOCUS_TRACKS.map((track) => (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => setSelectedTrack(track)}
                  className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                    selectedTrack.id === track.id
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <span className="block truncate font-medium">{track.title}</span>
                  <span className="text-muted-foreground text-xs">{track.artist}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
