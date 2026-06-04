import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const realSupabase = createClient(supabaseUrl, supabaseAnonKey)

// In local sandbox environment with a paused Supabase project, default to offline mock mode
let useMock = true;

// Mock authentication listeners
const authListeners = new Set<(event: string, session: any) => void>();

const mockAuth = {
  async getSession() {
    if (typeof window === 'undefined') return { data: { session: null }, error: null };
    const userStr = localStorage.getItem('boreum_mock_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return { data: { session: { user, access_token: 'mock-token' } }, error: null };
    }
    return { data: { session: null }, error: null };
  },
  async getUser() {
    if (typeof window === 'undefined') return { data: { user: null }, error: null };
    const userStr = localStorage.getItem('boreum_mock_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return { data: { user }, error: null };
    }
    return { data: { user: null }, error: null };
  },
  onAuthStateChange(callback: (event: string, session: any) => void) {
    authListeners.add(callback);
    this.getSession().then(({ data: { session } }) => {
      callback('INITIAL_SESSION', session);
    });
    return {
      data: {
        subscription: {
          unsubscribe() {
            authListeners.delete(callback);
          }
        }
      }
    };
  },
  async signInWithPassword({ email }: { email: string }) {
    const user = { id: 'mock-uid-' + email.split('@')[0], email };
    localStorage.setItem('boreum_mock_user', JSON.stringify(user));
    
    // Automatically add this user as an '운영진' member locally if they sign in for the first time
    const members = getLocalData('members');
    const emailPrefix = email.split('@')[0];
    if (!members.some((m: any) => m.name === emailPrefix)) {
      members.push({
        id: user.id,
        name: emailPrefix,
        role: '운영진',
        books_count: 0,
        interests: ['인문학', 'IT'],
        avatar_char: emailPrefix.charAt(0).toUpperCase(),
        avatar_bg: '#CCFBF1',
        avatar_text: '#0F766E'
      });
      saveLocalData('members', members);
    }

    authListeners.forEach(cb => cb('SIGNED_IN', { user, access_token: 'mock-token' }));
    return { data: { user, session: { user } }, error: null };
  },
  async signUp({ email }: { email: string }) {
    const user = { id: 'mock-uid-' + email.split('@')[0], email };
    localStorage.setItem('boreum_mock_user', JSON.stringify(user));

    // Automatically add this user as an '운영진' member locally if they sign up
    const members = getLocalData('members');
    const emailPrefix = email.split('@')[0];
    if (!members.some((m: any) => m.name === emailPrefix)) {
      members.push({
        id: user.id,
        name: emailPrefix,
        role: '운영진',
        books_count: 0,
        interests: ['인문학', 'IT'],
        avatar_char: emailPrefix.charAt(0).toUpperCase(),
        avatar_bg: '#CCFBF1',
        avatar_text: '#0F766E'
      });
      saveLocalData('members', members);
    }

    authListeners.forEach(cb => cb('SIGNED_IN', { user, access_token: 'mock-token' }));
    return { data: { user, session: { user } }, error: null };
  },
  async signOut() {
    localStorage.removeItem('boreum_mock_user');
    authListeners.forEach(cb => cb('SIGNED_OUT', null));
    return { error: null };
  }
};

function getLocalData(table: string) {
  if (typeof window === 'undefined') return [];
  const local = localStorage.getItem(`boreum_db_${table}`);
  if (local) return JSON.parse(local);
  
  // Default seed data
  let seed: any[] = [];
  if (table === 'members') {
    seed = [
      { id: 'mock-uid-testleader', name: 'testleader', role: '운영진', books_count: 5, interests: ['SF', '인문학'], avatar_char: 'T', avatar_bg: '#CCFBF1', avatar_text: '#0F766E' },
      { id: '2', name: '김민수', role: '멤버', books_count: 3, interests: ['철학', '예술'], avatar_char: '김', avatar_bg: '#DBEAFE', avatar_text: '#1E40AF' },
      { id: '3', name: '이지은', role: '멤버', books_count: 2, interests: ['디자인', '에세이'], avatar_char: '이', avatar_bg: '#FEF3C7', avatar_text: '#92400E' }
    ];
  } else if (table === 'books') {
    seed = [
      { id: 'demian', title: '데미안 (헤르만 헤세)', author: '헤르만 헤세' },
      { id: 'meditation', title: '명상록 (마르쿠스 아우렐리우스)', author: '마르쿠스 아우렐리우스' }
    ];
  } else if (table === 'meetings') {
    seed = [
      {
        id: 'demian',
        title: '헤르만 헤세 《데미안》과 현대 사회의 주체적 자아 성찰',
        meeting_date: '2026-06-15',
        time_range: '오후 3:00 - 5:30',
        location: '서울 마포구 연남동 북카페 보름달 아지트',
        attendees: 8,
        max_attendees: 15,
        status: 'upcoming',
        is_highlight: true,
        leader_id: 'guest',
        notice: '반갑습니다! 첫 모임 전까지 헤르만 헤세의 《데미안》을 완독하고, 가장 인상 깊었던 구절 1개와 그 이유를 적어오세요. 당일 오프라인 모임에서는 각자 부수고 싶은 자신만의 알(세계)과 현대인들의 한계에 대해 심도 깊은 대화를 나눌 예정입니다.',
      },
      {
        id: 'meditation',
        title: '마르쿠스 아우렐리우스 《명상록》으로 읽는 불안과 내면의 평온',
        meeting_date: '2026-06-22',
        time_range: '오후 4:00 - 6:30',
        location: '온라인 실시간 Zoom 회의실',
        attendees: 5,
        max_attendees: 12,
        status: 'upcoming',
        is_highlight: false,
        leader_id: 'leader-meditation',
        notice: '안녕하세요. 이번 모임은 온라인으로 진행됩니다. 명상록을 읽으며 일상에서 마음을 흔드는 불안 요소들을 나열하고, 스토아 철학 관점에서 이를 어떻게 흘려보낼 수 있을지 의견을 준비해 주시기 바랍니다.',
      }
    ];
  }
  localStorage.setItem(`boreum_db_${table}`, JSON.stringify(seed));
  return seed;
}

function saveLocalData(table: string, data: any[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`boreum_db_${table}`, JSON.stringify(data));
}

const mockFrom = (table: string) => {
  const chain: any = {
    select(fields?: string) {
      return this;
    },
    eq(col: string, val: any) {
      this._filter = (item: any) => {
        const itemVal = item[col];
        return String(itemVal) === String(val);
      };
      return this;
    },
    order(col: string, options?: any) {
      this._sort = (a: any, b: any) => {
        const factor = options?.ascending === false ? -1 : 1;
        return a[col] > b[col] ? factor : -factor;
      };
      return this;
    },
    limit(n: number) {
      this._limit = n;
      return this;
    },
    single() {
      this._single = true;
      return this;
    },
    maybeSingle() {
      this._maybeSingle = true;
      return this;
    },
    async insert(payload: any) {
      const data = getLocalData(table);
      const items = Array.isArray(payload) ? payload : [payload];
      const newItems = items.map(item => ({
        id: item.id || Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        ...item
      }));
      const updated = [...newItems, ...data];
      saveLocalData(table, updated);
      return { data: Array.isArray(payload) ? newItems : newItems[0], error: null };
    },
    async delete() {
      this._delete = true;
      return this;
    },
    async then(onfulfilled: any, onrejected: any) {
      try {
        let data = getLocalData(table);
        if (this._filter) {
          data = data.filter(this._filter);
        }
        if (this._delete) {
          const all = getLocalData(table);
          const filtered = all.filter((item: any) => !data.some((d: any) => d.id === item.id));
          saveLocalData(table, filtered);
          return onfulfilled({ data: null, error: null });
        }
        if (table === 'meetings') {
          const books = getLocalData('books');
          data = data.map((meeting: any) => {
            const book = books.find((b: any) => b.id === meeting.book_id || b.id === meeting.id);
            return {
              ...meeting,
              books: book ? { title: book.title } : null
            };
          });
        }
        if (this._sort) {
          data.sort(this._sort);
        }
        if (this._limit) {
          data = data.slice(0, this._limit);
        }
        if (this._single) {
          return onfulfilled({ data: data[0] || null, error: data[0] ? null : { message: 'Not found' } });
        }
        if (this._maybeSingle) {
          return onfulfilled({ data: data[0] || null, error: null });
        }
        return onfulfilled({ data, error: null });
      } catch (err) {
        if (onrejected) return onrejected(err);
        throw err;
      }
    },
    _filter: null,
    _sort: null,
    _limit: null,
    _single: false,
    _maybeSingle: false,
    _delete: false
  };
  return chain;
};

const mockClient = {
  auth: mockAuth,
  from: mockFrom
};

function wrapBuilder(builder: any, table: string): any {
  if (!builder) return builder;

  return new Proxy(builder, {
    get(target, prop) {
      if (prop === 'then') {
        return function (onfulfilled: any, onrejected: any) {
          return target.then(
            (res: any) => {
              if (res?.error && (res.error.message?.includes('fetch') || res.error.message?.includes('network') || res.error.message?.includes('Failed to fetch') || res.error.message?.includes('ERR_NAME_NOT_RESOLVED') || res.error.message?.includes('getaddrinfo'))) {
                console.warn(`[Boreum DB] Fetch failed for ${table}, switching to offline mock DB.`);
                useMock = true;
                return mockFrom(table).then(onfulfilled, onrejected);
              }
              return onfulfilled(res);
            },
            (err: any) => {
              console.warn(`[Boreum DB] Query failed for ${table}, switching to offline mock DB.`, err);
              useMock = true;
              return mockFrom(table).then(onfulfilled, onrejected);
            }
          );
        };
      }

      const val = target[prop];
      if (typeof val === 'function') {
        return function (...args: any[]) {
          const nextBuilder = val.apply(target, args);
          return wrapBuilder(nextBuilder, table);
        };
      }

      return val;
    }
  });
}

export const supabase = new Proxy(realSupabase, {
  get(target, prop) {
    if (useMock) {
      return (mockClient as any)[prop] || (target as any)[prop];
    }

    if (prop === 'auth') {
      return new Proxy(target.auth, {
        get(authTarget, authProp) {
          const originalMethod = (authTarget as any)[authProp];
          if (typeof originalMethod !== 'function') return originalMethod;

          if (authProp === 'onAuthStateChange') {
            return function (...args: any[]) {
              if (useMock) {
                return mockAuth.onAuthStateChange.apply(mockAuth, args as any);
              }
              try {
                return originalMethod.apply(authTarget, args);
              } catch (err) {
                console.warn("[Boreum Auth] onAuthStateChange failed, switching to mock auth.", err);
                useMock = true;
                return mockAuth.onAuthStateChange.apply(mockAuth, args as any);
              }
            };
          }

          return async function (...args: any[]) {
            try {
              const res = await originalMethod.apply(authTarget, args);
              if (res?.error && (res.error.message?.includes('fetch') || res.error.message?.includes('network') || res.error.message?.includes('Failed to fetch') || res.error.message?.includes('ERR_NAME_NOT_RESOLVED'))) {
                console.warn("[Boreum Auth] Network failed, switching to offline mock auth.");
                useMock = true;
                return (mockAuth as any)[authProp].apply(mockAuth, args as any);
              }
              return res;
            } catch (err) {
              console.warn("[Boreum Auth] Auth threw error, switching to offline mock auth.", err);
              useMock = true;
              return (mockAuth as any)[authProp].apply(mockAuth, args as any);
            }
          };
        }
      });
    }

    if (prop === 'from') {
      return function (table: string) {
        if (useMock) {
          return mockFrom(table);
        }
        const query = target.from(table);
        return wrapBuilder(query, table);
      };
    }

    return (target as any)[prop];
  }
});
