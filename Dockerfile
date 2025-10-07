# ---- builder ----
FROM node:20 AS builder

# set working dir
WORKDIR /usr/src/app

# copy package manifest first (caching)
COPY package.json package-lock.json* ./

# install all deps (including devDeps for tsc)
RUN npm ci

# copy source + tsconfig
COPY tsconfig.json ./
COPY src ./src

# build TypeScript
RUN npm run build

# ---- runtime ----
FROM node:20-slim AS runtime

WORKDIR /usr/src/app

# set NODE_ENV
ENV NODE_ENV=production
ENV PORT=3000

# copy only production dependencies
COPY package.json package-lock.json* ./
# install production deps only
RUN npm ci --omit=dev

# copy built files
COPY --from=builder /usr/src/app/dist ./dist

# if you have public/static assets:
# COPY --from=builder /usr/src/app/public ./public

# non-root user (optional)
RUN useradd --user-group --create-home --shell /bin/false appuser
USER appuser

EXPOSE 3000

# adjust entry point if file different
CMD ["node", "dist/index.js"]