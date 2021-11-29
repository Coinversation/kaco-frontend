export interface PlayerAccount {
  address: string;
  powCount: number;
}

export interface SessionAccount {
  address: string;
  mnemonic: string;
  powCount: number;
  isActive: boolean;
}
export type Account = {
  player: PlayerAccount;
  session: SessionAccount;
};
