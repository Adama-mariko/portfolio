/** État global de l'interface (terminal, matrice, menu mobile). */
class UiState {
	terminalOpen = $state(false);
	matrixOpen = $state(false);
	menuOpen = $state(false);

	toggleTerminal() {
		this.terminalOpen = !this.terminalOpen;
	}
}

export const ui = new UiState();
