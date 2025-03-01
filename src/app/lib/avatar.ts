export type AvatarState = {
    body: HTMLBodyElement,
    frameno: number,
    variant: "boy" | "girl",
}

const TOTAL_FRAMES = 10;

export function setupAvatar(body: HTMLBodyElement, variant: "boy" | "girl"): AvatarState {
    let state = {
        body,
        frameno: 1,
        variant,
    };

    renderAvatar(state);
    return state;
}

export function removeAvatar(state: AvatarState) {
    state.body.style.backgroundImage = "none";
}

export function renderAvatar(state: AvatarState) {
    state.body.style.backgroundImage = `url(/near-chan-${state.variant}/${state.frameno}.png)`
}

export function nextFrame(state: AvatarState) {
    state.frameno = (state.frameno + 1) % TOTAL_FRAMES;
    renderAvatar(state);
}
