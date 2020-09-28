/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const B64_PADD: string = '=';
const B64_ALPHA: string   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';


export class GlobiacUtils {

	private static getByte(s: string, i: number): number {
		const charCode = s.charCodeAt(i);
		return charCode;
	}

	private static getByte64(str: string, i: number): number {
		const idx = B64_ALPHA.indexOf(str.charAt(i));
		return idx;
	}

	public static decodeString(s: string): string {
		let pads: number = 0,
			i, b10, imax = s.length,
			x            = [];

		s = String(s);

		if (imax === 0) {
			return s;
		}

		if (s.charAt(imax - 1) === B64_PADD) {
			pads = 1;
			if (s.charAt(imax - 2) === B64_PADD) {
				pads = 2;
			}
			imax -= 4;
		}

		for (i = 0; i < imax; i += 4) {
			b10 = (GlobiacUtils.getByte64(s, i) << 18) | (GlobiacUtils.getByte64(s, i + 1) << 12) | (GlobiacUtils.getByte64(s, i + 2) << 6) | this.getByte64(s, i + 3);
			x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255));
		}

		switch (pads) {
			case 1:
				b10 = (GlobiacUtils.getByte64(s, i) << 18) | (GlobiacUtils.getByte64(s, i + 1) << 12) | (this.getByte64(s, i + 2) << 6);
				x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
				break;
			case 2:
				b10 = (GlobiacUtils.getByte64(s, i) << 18) | (GlobiacUtils.getByte64(s, i + 1) << 12);
				x.push(String.fromCharCode(b10 >> 16));
				break;
		}

		return x.join('');
	}

	public encode(s: string): string {
		s = String(s);

		let i, b10, x = [],
			imax      = s.length - s.length % 3;

		if (s.length === 0) {
			return s;
		}

		for (i = 0; i < imax; i += 3) {
			b10 = (GlobiacUtils.getByte(s, i) << 16) | (GlobiacUtils.getByte(s, i + 1) << 8) | GlobiacUtils.getByte(s, i + 2);
			x.push(B64_ALPHA.charAt(b10 >> 18));
			x.push(B64_ALPHA.charAt((b10 >> 12) & 63));
			x.push(B64_ALPHA.charAt((b10 >> 6) & 63));
			x.push(B64_ALPHA.charAt(b10 & 63));
		}

		switch (s.length - imax) {
			case 1:
				b10 = GlobiacUtils.getByte(s, i) << 16;
				x.push(B64_ALPHA.charAt(b10 >> 18) + B64_ALPHA.charAt((b10 >> 12) & 63) + B64_PADD + B64_PADD);
				break;
			case 2:
				b10 = (GlobiacUtils.getByte(s, i) << 16) | (GlobiacUtils.getByte(s, i + 1) << 8);
				x.push(B64_ALPHA.charAt(b10 >> 18) + B64_ALPHA.charAt((b10 >> 12) & 63) + B64_ALPHA.charAt((b10 >> 6) & 63) + B64_PADD);
				break;
		}

		return x.join('');
	}
}