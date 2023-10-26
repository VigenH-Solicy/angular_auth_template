import express from 'express';

declare module 'express-session' {
  interface SessionData {
    jwt: string | undefined;
    token: string;
  }
}