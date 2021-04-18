/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "hot/hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "hot/hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ff2203";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/components/EventCards.less":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/components/EventCards.less ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/css/app.less":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/css/app.less ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!../static/tailwindu.css */ "./node_modules/css-loader/dist/cjs.js!./src/static/tailwindu.css");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ../fonts/MaterialIcons-Regular.eot */ "./src/fonts/MaterialIcons-Regular.eot");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ../fonts/MaterialIcons-Regular.woff2 */ "./src/fonts/MaterialIcons-Regular.woff2");
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(/*! ../fonts/MaterialIcons-Regular.woff */ "./src/fonts/MaterialIcons-Regular.woff");
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(/*! ../fonts/MaterialIcons-Regular.ttf */ "./src/fonts/MaterialIcons-Regular.ttf");
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(/*! ../fonts/Framework7Icons-Regular.eot */ "./src/fonts/Framework7Icons-Regular.eot");
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(/*! ../fonts/Framework7Icons-Regular.woff2 */ "./src/fonts/Framework7Icons-Regular.woff2");
var ___CSS_LOADER_URL_IMPORT_6___ = __webpack_require__(/*! ../fonts/Framework7Icons-Regular.woff */ "./src/fonts/Framework7Icons-Regular.woff");
var ___CSS_LOADER_URL_IMPORT_7___ = __webpack_require__(/*! ../fonts/Framework7Icons-Regular.ttf */ "./src/fonts/Framework7Icons-Regular.ttf");
var ___CSS_LOADER_URL_IMPORT_8___ = __webpack_require__(/*! ../static/fonts/JosefinSans-Regular.ttf */ "./src/static/fonts/JosefinSans-Regular.ttf");
var ___CSS_LOADER_URL_IMPORT_9___ = __webpack_require__(/*! ../static/img/f7-icon.png */ "./src/static/img/f7-icon.png");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap);"]);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_9___);
// Module
exports.push([module.i, "/* 040421 */\n@font-face {\n  font-family: 'Material Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  /* For IE6-8 */\n  src: local('Material Icons'), local('MaterialIcons-Regular'), url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff2'), url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff'), url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('truetype');\n}\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  /* Preferred icon size */\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  -moz-font-feature-settings: 'liga';\n       font-feature-settings: 'liga';\n}\n@font-face {\n  font-family: 'Framework7 Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format('woff2'), url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format('woff'), url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format('truetype');\n}\n.f7-icons {\n  font-family: 'Framework7 Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 28px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n  -moz-osx-font-smoothing: grayscale;\n  -moz-font-feature-settings: 'liga=1';\n  -moz-font-feature-settings: 'liga';\n  font-feature-settings: 'liga';\n  text-align: center;\n}\n@font-face {\n  font-family: 'Josefin Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Josefin Sans\"), local(\"JosefinSans\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n@font-face {\n  font-family: 'Josefin Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Josefin Sans\"), local(\"JosefinSans\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\nbody,\n.ios body,\n.md body {\n  font-family: Josefin Sans, sans-serif;\n  font-size: 12pt;\n}\n.md:not([class*='color-theme']) {\n  --f7-theme-color: #6200ee;\n  --f7-theme-color-rgb: 98, 0, 238;\n  --f7-theme-color-shade: #5100c5;\n  --f7-theme-color-tint: #7718ff;\n}\n.demo-list-icon,\n.icon-f7 {\n  background: #ccc;\n  display: block;\n  position: relative;\n}\n.theme-dark .demo-list-icon {\n  background-color: #555;\n}\n.icon-f7 {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") no-repeat center;\n  background-size: cover;\n}\n.ios .demo-list-icon,\n.ios .icon-f7,\n.ios .icon-vi {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  box-sizing: border-box;\n}\n.md .demo-list-icon,\n.md .icon-f7,\n.md .icon-vi {\n  width: 24px;\n  height: 24px;\n  border-radius: 4px;\n}\n.aurora .demo-list-icon,\n.aurora .icon-f7,\n.aurora .icon-vi {\n  width: 24px;\n  height: 24px;\n  border-radius: 4px;\n}\n/* Lazy Demo */\nimg.demo-lazy {\n  display: block;\n  width: 100%;\n  height: auto;\n}\ndiv.demo-lazy {\n  background: #aaa;\n  background-size: cover;\n  height: 300px;\n  height: 60vw;\n}\n/* FAB Morph */\n.demo-fab-sheet {\n  position: absolute;\n  left: 16px;\n  bottom: 80px;\n  width: 140px;\n  background: #fff;\n  box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.4);\n  border-radius: 5px;\n  z-index: 1600;\n  margin: 0 !important;\n}\n.ios .demo-fab-sheet {\n  bottom: 15px;\n}\n.md .demo-fab-sheet {\n  bottom: 16px;\n}\n.demo-fab-fullscreen-sheet {\n  position: absolute;\n  left: 10px;\n  right: 10px;\n  top: calc(64px + var(--f7-safe-area-top));\n  bottom: 0;\n  background: #fff;\n  z-index: 1600;\n  border-radius: 5px 5px 0 0;\n  box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.4);\n  overflow: hidden;\n}\n@media (min-width: 768px) {\n  .demo-fab-fullscreen-sheet {\n    left: 20%;\n    width: 60%;\n    right: auto;\n    height: 80%;\n    top: auto;\n  }\n}\n.demo-fab-fullscreen-sheet .page {\n  background: #fff;\n}\n/* Demo Messagebar */\n.ios .messagebar:not(.messagebar-with-value):not(.messagebar-attachments-visible) a.demo-send-message-link {\n  pointer-events: none;\n  color: #8e8e8e;\n}\n.md .messagebar:not(.messagebar-with-value):not(.messagebar-attachments-visible) a.demo-send-message-link {\n  pointer-events: none;\n  opacity: 0.5;\n}\n/* Grid demo */\n.grid-demo div[class*='col'] {\n  background: #fff;\n  text-align: center;\n  color: #000;\n  border: 1px solid #ddd;\n  padding: 5px;\n  font-size: 12px;\n  margin-bottom: 15px;\n}\n.grid-resizable-demo {\n  --f7-grid-row-gap: 16px;\n}\n.grid-resizable-demo div[class*='col'] {\n  margin-bottom: 0;\n}\n.grid-resizable-demo .demo-col-center-content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.theme-dark .grid-demo div[class*='col'] {\n  background-color: #000;\n  color: #fff;\n  border-color: #444;\n}\n/* Cards Demo */\n.demo-card-header-pic .card-header {\n  height: 40vw;\n  background-size: cover;\n  background-position: center;\n  color: #fff;\n}\n.demo-card-header-pic .card-content-padding .date {\n  color: #8e8e93;\n}\n.demo-facebook-card .card-header {\n  display: block;\n  padding: 10px;\n}\n.demo-facebook-card .demo-facebook-avatar {\n  float: left;\n}\n.demo-facebook-card .demo-facebook-name {\n  margin-left: 44px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.demo-facebook-card .demo-facebook-date {\n  margin-left: 44px;\n  font-size: 13px;\n  color: #8e8e93;\n}\n.demo-facebook-card .card-footer {\n  background: #fafafa;\n}\n.theme-dark .demo-facebook-card .card-footer {\n  background-color: transparent;\n}\n.demo-facebook-card .card-footer a {\n  color: #81848b;\n  font-weight: 500;\n}\n.demo-facebook-card .card-content img {\n  display: block;\n}\n.demo-facebook-card .card-content-padding {\n  padding: 15px 10px;\n}\n.demo-facebook-card .card-content-padding .likes {\n  color: #8e8e93;\n}\n/* Panels Demo */\n.panel {\n  min-width: 150px;\n  max-width: 90%;\n}\n.ios .panel-right.panel-in ~ .view-main:after,\n.ios .panel-right.panel-out ~ .view-main:after {\n  content: '';\n  height: 100%;\n  width: 1px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  background: #ddd;\n  z-index: 1000;\n}\n.ios .theme-dark .panel-right.panel-in ~ .view-main:after,\n.ios .theme-dark .panel-right.panel-out ~ .view-main:after {\n  background: #282828;\n}\n.ios .panel-left:after {\n  content: '';\n  height: 100%;\n  width: 1px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  background: #ddd;\n  z-index: 1000;\n}\n.ios .theme-dark .panel-left:after {\n  background: #282828;\n}\n/* Swipers Demo */\n.demo-swiper {\n  width: 100%;\n  height: 100%;\n}\n.demo-swiper .swiper-slide,\n.demo-swiper-multiple .swiper-slide {\n  font-size: 25px;\n  font-weight: 300;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #fff;\n  color: #000;\n}\n.demo-swiper-multiple .swiper-slide {\n  box-sizing: border-box;\n  border: 1px solid #ccc;\n  background: #fff;\n}\n.demo-swiper-multiple {\n  margin: 0px 0 35px;\n  font-size: 18px;\n  height: 120px;\n}\n.demo-swiper-multiple.demo-swiper-multiple-auto .swiper-slide {\n  width: 85%;\n}\n.demo-swiper-multiple.demo-swiper-multiple-auto .swiper-slide:nth-child(2n) {\n  width: 70%;\n}\n.demo-swiper-multiple.demo-swiper-multiple-auto .swiper-slide:nth-child(3n) {\n  width: 30%;\n}\n.demo-swiper-custom {\n  height: 100%;\n}\n.demo-swiper-custom .swiper-container {\n  background: #000;\n  height: 100%;\n}\n.demo-swiper-custom .swiper-slide {\n  background-size: cover;\n  background-position: center;\n}\n.demo-swiper-custom .swiper-pagination .swiper-pagination-bullet {\n  cursor: pointer;\n  width: 10px;\n  height: 10px;\n  background: rgba(255, 255, 255, 0);\n  opacity: 1;\n  border-radius: 0;\n  transition: 200ms;\n  position: relative;\n  transform: scale(0.9);\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.8);\n}\n.demo-swiper-custom .swiper-pagination .swiper-pagination-bullet-active {\n  z-index: 1;\n  border: 1px solid #007aff;\n  transform: scale(1.4);\n}\n.demo-swiper-cube {\n  width: 80%;\n  height: 70%;\n  top: 15%;\n}\n.demo-swiper-coverflow {\n  height: 60%;\n  top: 20%;\n}\n.demo-swiper-coverflow .swiper-slide {\n  width: 65%;\n}\n.demo-swiper-cube .swiper-slide,\n.demo-swiper-coverflow .swiper-slide {\n  background-size: cover;\n  color: #fff;\n  -webkit-backface-visibility: hidden;\n}\n.demo-swiper-fade .swiper-slide {\n  background-size: cover;\n  background-position: center;\n}\n.demo-swiper-gallery-top {\n  height: 70%;\n}\n.demo-swiper-gallery-thumbs {\n  margin-top: 10px;\n  height: 20%;\n  height: -ms-calc(10%);\n  height: calc(30% - 20px);\n}\n.demo-swiper-gallery-thumbs .swiper-slide {\n  width: 25%;\n}\n.demo-swiper-gallery-thumbs .swiper-slide-pic {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0.35;\n  transition: 300ms;\n}\n.demo-swiper-gallery-thumbs .swiper-slide-thumb-active .swiper-slide-pic {\n  opacity: 1;\n}\n.demo-swiper-gallery-top .swiper-slide,\n.demo-swiper-gallery-thumbs .swiper-slide-pic {\n  background-size: cover;\n  background-position: center;\n}\n.demo-swiper-parallax {\n  height: 100%;\n}\n.demo-swiper-parallax .swiper-parallax-bg {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 130%;\n  height: 100%;\n  background-size: cover;\n  background-position: center;\n}\n.demo-swiper-parallax .swiper-slide {\n  box-sizing: border-box;\n  padding: 40px 60px;\n  color: #fff;\n}\n.demo-swiper-parallax .swiper-slide-title {\n  font-size: 41px;\n  font-weight: 300;\n}\n.demo-swiper-parallax .swiper-slide-subtitle {\n  font-size: 21px;\n}\n.demo-swiper-parallax .swiper-slide-text {\n  font-size: 14px;\n  max-width: 400px;\n  line-height: 1.3;\n}\n.demo-swiper-lazy {\n  height: 100%;\n}\n.demo-swiper-lazy .swiper-slide {\n  position: relative;\n}\n.demo-swiper-lazy .swiper-slide img {\n  width: auto;\n  height: auto;\n  max-width: 100%;\n  max-height: 100%;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n/* Icons Demo */\ncode {\n  background: #f3f3f3;\n  padding: 5px;\n  font-size: 12px;\n}\n.theme-dark code {\n  background: #000;\n}\n.demo-icon {\n  text-align: center;\n  margin-top: 15px;\n  margin-bottom: 15px;\n  color: #333;\n}\n.theme-dark .demo-icon {\n  color: #fff;\n}\n.demo-icon .demo-icon-name {\n  margin-top: 5px;\n  font-size: 11px;\n  color: #666;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.theme-dark .demo-icon .demo-icon-name {\n  color: #aaa;\n}\n#calendar,\n#calendar-events {\n  height: 50%;\n  box-sizing: border-box;\n}\n#calendar .calendar {\n  height: 100%;\n}\n#calendar-events ul {\n  height: 100%;\n  overflow: auto;\n}\n#calendar-events .event-color {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 8px;\n  height: 100%;\n}\n@media (orientation: landscape) {\n  #calendar {\n    float: left;\n  }\n  #calendar,\n  #calendar-events {\n    height: 100%;\n  }\n  #calendar,\n  #calendar-events {\n    width: 50%;\n  }\n  #calendar-events {\n    margin-left: 50% !important;\n    border-left: 1px solid #eee;\n  }\n  .theme-dark #calendar-events {\n    border-left-color: #282828;\n  }\n}\n.elevation-demo {\n  height: 100px;\n  margin: 30px 10px;\n  background: #fff;\n  font-size: 18px;\n  text-align: center;\n  line-height: 100px;\n}\n.theme-dark .elevation-demo {\n  background: none;\n}\n/* Demo Color Themes */\n.demo-theme-picker {\n  cursor: pointer;\n  padding: 30px;\n  border-radius: 10px;\n  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  box-sizing: border-box;\n  position: relative;\n}\n.demo-theme-picker .checkbox {\n  position: absolute;\n  left: 10px;\n  bottom: 10px;\n}\n.demo-color-picker-button {\n  margin-bottom: 1em;\n  text-transform: capitalize;\n}\n.demo-bars-picker {\n  height: 200px;\n  border-radius: 10px;\n  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  background: var(--f7-page-bg-color);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.demo-bars-picker .checkbox {\n  position: absolute;\n  left: 10px;\n  bottom: 10px;\n}\n.demo-bars-picker .demo-navbar {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  height: 30px;\n  top: 0;\n  border-bottom: 1px solid transparent;\n}\n.demo-bars-picker .demo-navbar:before {\n  content: '';\n  position: absolute;\n  left: 10px;\n  width: 20px;\n  height: 10px;\n  top: 50%;\n  margin-top: -5px;\n}\n.demo-bars-picker .demo-navbar:after {\n  content: '';\n  position: absolute;\n  right: 10px;\n  width: 20px;\n  height: 10px;\n  top: 50%;\n  margin-top: -5px;\n}\n.demo-bars-picker-empty .demo-navbar {\n  background: #f7f7f8;\n  border-color: rgba(0, 0, 0, 0.1);\n}\n.theme-dark .demo-bars-picker-empty .demo-navbar {\n  background: #1b1b1b;\n  border-color: #282829;\n}\n.demo-bars-picker-empty .demo-navbar:before,\n.demo-bars-picker-empty .demo-navbar:after {\n  background: var(--f7-theme-color);\n}\n.demo-bars-picker-fill .demo-navbar {\n  background: var(--f7-theme-color);\n}\n.demo-bars-picker-fill .demo-navbar:before,\n.demo-bars-picker-fill .demo-navbar:after {\n  background: #fff;\n}\n/* Demo Expandable Cards */\n@media (min-width: 768px) {\n  .demo-expandable-cards {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .demo-expandable-cards .card {\n    flex-shrink: 10;\n    min-width: 0;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .demo-expandable-cards .card {\n    width: calc((100% - var(--f7-card-expandable-margin-horizontal) * 3) / 2);\n  }\n  .demo-expandable-cards .card:nth-child(2),\n  .demo-expandable-cards .card:nth-child(4) {\n    margin-left: 0;\n  }\n  .demo-expandable-cards .card:nth-child(n + 3) {\n    margin-top: 0;\n  }\n}\n@media (min-width: 1024px) {\n  .demo-expandable-cards .card {\n    width: calc((100% - var(--f7-card-expandable-margin-horizontal) * 5) / 4);\n  }\n  .demo-expandable-cards .card:nth-child(n + 2) {\n    margin-left: 0;\n  }\n}\n.view-master-detail .navbar-master-detail-root .link.back,\n.view-master-detail .page-master-detail-root .navbar .link.back {\n  display: none;\n}\n/* Demo Popup & Sheet Swipe To Close */\n.demo-popup-swipe-handler {\n  --f7-popup-border-radius: 15px 15px 0 0;\n  --f7-popup-tablet-border-radius: 15px;\n  --f7-block-strong-border-color: transparent;\n  height: calc(100% - var(--f7-navbar-height) - var(--f7-safe-area-top));\n  top: calc(var(--f7-navbar-height) + var(--f7-safe-area-top));\n}\n.demo-popup-swipe-handler .swipe-handler {\n  background: var(--f7-page-bg-color);\n}\n.demo-popup-swipe-handler .page-content {\n  padding-top: 16px;\n}\n.demo-sheet-swipe-to-close,\n.demo-sheet-swipe-to-step {\n  --f7-sheet-border-color: transparent;\n  border-radius: 15px 15px 0 0;\n  overflow: hidden;\n}\n.demo-sheet-swipe-to-close .swipe-handler,\n.demo-sheet-swipe-to-step .swipe-handler {\n  background: none;\n}\n.swipe-handler {\n  height: 16px;\n  position: absolute;\n  left: 0;\n  width: 100%;\n  top: 0;\n  background: #fff;\n  cursor: pointer;\n  z-index: 10;\n}\n.swipe-handler:after {\n  content: '';\n  width: 36px;\n  height: 6px;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-left: -18px;\n  margin-top: -3px;\n  border-radius: 3px;\n  background: #666;\n}\n.page-home,\n.page-about {\n  --f7-list-border-color: transparent;\n  --f7-block-strong-border-color: transparent;\n  --f7-block-font-size: 16px;\n}\n:root:not(.theme-dark) .page-home,\n:root:not(.theme-dark) .page-about {\n  --f7-page-bg-color: #fff;\n}\n.area-chart {\n  max-width: 768px;\n  margin: 0 auto;\n}\n.area-chart svg {\n  max-height: 320px;\n}\n.pie-chart svg {\n  max-width: 320px;\n}\nimg {\n  max-width: 100%;\n}\n.text_center * {\n  text-align: center;\n  justify-content: center !important;\n}\n.card-header-pic .card-header {\n  background-size: cover;\n  background-position: center;\n  color: #fff;\n}\ndiv.location > span {\n  margin-left: 4pt;\n}\n.profile_pic_banner {\n  height: 200px;\n}\n.profile_pic_banner.small {\n  height: 100px;\n}\ndiv.parallax {\n  /* Set a specific height */\n  min-height: 500px;\n  /* Create the parallax scrolling effect */\n  background-attachment: fixed;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  opacity: 0.65;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/pages/Today.less":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/less-loader/dist/cjs.js!./src/pages/Today.less ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/static/tailwindu.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/static/tailwindu.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".w-0 {\n  width: 0\n}\n\n.w-1 {\n  width: 0.25rem\n}\n\n.w-2 {\n  width: 0.5rem\n}\n\n.w-3 {\n  width: 0.75rem\n}\n\n.w-4 {\n  width: 1rem\n}\n\n.w-5 {\n  width: 1.25rem\n}\n\n.w-6 {\n  width: 1.5rem\n}\n\n.w-8 {\n  width: 2rem\n}\n\n.w-10 {\n  width: 2.5rem\n}\n\n.w-12 {\n  width: 3rem\n}\n\n.w-16 {\n  width: 4rem\n}\n\n.w-20 {\n  width: 5rem\n}\n\n.w-24 {\n  width: 6rem\n}\n\n.w-32 {\n  width: 8rem\n}\n\n.w-40 {\n  width: 10rem\n}\n\n.w-48 {\n  width: 12rem\n}\n\n.w-56 {\n  width: 14rem\n}\n\n.w-64 {\n  width: 16rem\n}\n\n.w-auto {\n  width: auto\n}\n\n.w-px {\n  width: 1px\n}\n.w49p{width:49%}\n.w-1\\/2 {\n  width: 50%\n}\n\n.w-1\\/3 {\n  width: 33.333333%\n}\n\n.w-2\\/3 {\n  width: 66.666667%\n}\n\n.w-1\\/4 {\n  width: 25%\n}\n\n.w-2\\/4 {\n  width: 50%\n}\n\n.w-3\\/4 {\n  width: 75%\n}\n\n.w-1\\/5 {\n  width: 20%\n}\n\n.w-2\\/5 {\n  width: 40%\n}\n\n.w-3\\/5 {\n  width: 60%\n}\n\n.w-4\\/5 {\n  width: 80%\n}\n\n.w-1\\/6 {\n  width: 16.666667%\n}\n\n.w-2\\/6 {\n  width: 33.333333%\n}\n\n.w-3\\/6 {\n  width: 50%\n}\n\n.w-4\\/6 {\n  width: 66.666667%\n}\n\n.w-5\\/6 {\n  width: 83.333333%\n}\n\n.w-1\\/12 {\n  width: 8.333333%\n}\n\n.w-2\\/12 {\n  width: 16.666667%\n}\n\n.w-3\\/12 {\n  width: 25%\n}\n\n.w-4\\/12 {\n  width: 33.333333%\n}\n\n.w-5\\/12 {\n  width: 41.666667%\n}\n\n.w-6\\/12 {\n  width: 50%\n}\n\n.w-7\\/12 {\n  width: 58.333333%\n}\n\n.w-8\\/12 {\n  width: 66.666667%\n}\n\n.w-9\\/12 {\n  width: 75%\n}\n\n.w-10\\/12 {\n  width: 83.333333%\n}\n\n.w-11\\/12 {\n  width: 91.666667%\n}\n\n.w-full {\n  width: 100%\n}\n\n.w-screen {\n  width: 100vw\n}\n\n.z-0 {\n  z-index: 0\n}\n\n.z-10 {\n  z-index: 10\n}\n\n.inline-block {\n  display: inline-block;\n}\n\n.inline {\n  display: inline;\n}\n\n.flex {\n  display: flex;\n}\n\n.inline-flex {\n  display: inline-flex;\n}\n\n.text-xs {\n  font-size: 0.75rem;\n}\n\n.text-sm {\n  font-size: 0.875rem;\n}\n\n.text-base {\n  font-size: 1rem;\n}\n\n.text-lg {\n  font-size: 1.125rem;\n}\n\n.text-xl {\n  font-size: 1.25rem;\n}\n\n.text-2xl {\n  font-size: 1.5rem;\n}\n\n.font-hairline {\n  font-weight: 100;\n}\n\n.font-thin {\n  font-weight: 200;\n}\n\n.font-light {\n  font-weight: 300;\n}\n\n.font-normal {\n  font-weight: 400;\n}\n\n.font-medium {\n  font-weight: 500;\n}\n\n.font-semibold {\n  font-weight: 600;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.font-extrabold {\n  font-weight: 800;\n}\n\n.font-black {\n  font-weight: 900;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dom7__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom7 */ "./node_modules/dom7/dom7.esm.js");
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");
/* harmony import */ var _js_pwa__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/pwa */ "./src/js/pwa.js");
/* harmony import */ var _js_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/routes */ "./src/js/routes.js");



/* eslint-disable react/jsx-props-no-spreading */




 // if (typeof window.f7 === "undefined") window.f7 = undefined //handy global. will be set in AppComponent below
// window.f7router = undefined //handy global. will be set in AppComponent below

/**
 * bootstrap framework 7 app. Has f7params
 * @returns {JSX.Element}
 * @constructor
 */

var AppComponent = function AppComponent() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])('today'),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  var previousTab = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    previousTab.current = activeTab;
  }, [activeTab]);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    // Fix viewport scale on mobiles
    if ((framework7_react__WEBPACK_IMPORTED_MODULE_4__["f7"].device.ios || framework7_react__WEBPACK_IMPORTED_MODULE_4__["f7"].device.android) && framework7_react__WEBPACK_IMPORTED_MODULE_4__["f7"].device.standalone) {
      var viewPortContent = document.querySelector('meta[name="viewport"]').getAttribute('content');
      document.querySelector('meta[name="viewport"]').setAttribute('content', "".concat(viewPortContent, ", maximum-scale=1, user-scalable=no"));
    }
  }, []); // Framework7 Parameters
  // configure routes here

  var f7params = {
    name: 'auto',
    theme: 'ios',
    routes: _js_routes__WEBPACK_IMPORTED_MODULE_6__["default"],
    autoDarkTheme: true,
    animate: false
  };

  if (false) {} // eslint-disable-next-line no-unused-vars


  function test_goto() {
    console.log("goto pressed");
    var f7r = window.f7router;
    f7r.navigate('/games/99');
    /*f7r.navigate({
      name: 'games',
      params: {gameid: 88},
    })*/
  }

  function onTabLinkClick(tab) {
    if (previousTab.current !== activeTab) return;

    if (activeTab === tab) {
      framework7_react__WEBPACK_IMPORTED_MODULE_4__["f7"].dialog.confirm('a');
      Object(dom7__WEBPACK_IMPORTED_MODULE_3__["default"])("#view-".concat(tab))[0].f7View.router.back();
    }
  }

  var theme = 'auto';

  if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_4__["App"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, f7params, {
    id: "io.framework7.testapp",
    theme: theme,
    routes: _js_routes__WEBPACK_IMPORTED_MODULE_6__["default"],
    popup: {
      closeOnEscape: true
    },
    sheet: {
      closeOnEscape: true
    },
    popover: {
      closeOnEscape: true
    },
    actions: {
      closeOnEscape: true
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_4__["Panel"], {
    left: true,
    cover: true,
    resizable: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_4__["View"], {
    url: "/panel-left/",
    linksView: ".view-main"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_4__["Panel"], {
    right: true,
    reveal: true,
    resizable: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_4__["View"], {
    url: "/panel-right/"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_4__["View"], {
    url: "/",
    main: true,
    className: "safe-areas"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "toolbar toolbar-bottom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "toolbar-inner"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    className: "link"
  }, "Link 1"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    className: "link"
  }, "Link 2"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    className: "link"
  }, "Link 3"))));
};

/* harmony default export */ __webpack_exports__["default"] = (AppComponent);

/***/ }),

/***/ "./src/components/EventCards.jsx":
/*!***************************************!*\
  !*** ./src/components/EventCards.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");
/* harmony import */ var _EventCards_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventCards.less */ "./src/components/EventCards.less");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jslib_jslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../jslib/jslib */ "./src/jslib/jslib.js");
/* harmony import */ var _Tabbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Tabbar */ "./src/components/Tabbar.jsx");

 // import {utils} from 'framework7';






var EventCards = function EventCards(_ref) {
  var noCollapsedNavbar = _ref.noCollapsedNavbar,
      events = _ref.events,
      f7router = _ref.f7router;
  window.f7router = f7router;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Page"], {
    className: "appstore-page ".concat(noCollapsedNavbar ? 'appstore-page-no-collapsed-navbar' : '')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["List"], {
    mediaList: true,
    inlineLabels: true,
    noHairlinesMd: true
  }, events && lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isArray(events) && events.map(function (event_m, i) {
    var band = event_m.first_band,
        price = null,
        ev_datetime = _jslib_jslib__WEBPACK_IMPORTED_MODULE_4__["default"].fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc);
    var band_img_or_event_img = event_m.img;
    if (!band_img_or_event_img && band && band.logo) band_img_or_event_img = band.logo;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
      key: i,
      reloadDetail: true,
      routeProps: {
        eventid: event_m.id,
        event_m: event_m
      },
      animate: "false",
      link: "/eventt/",
      event_m: event_m,
      title: event_m.name,
      after: price,
      text: ev_datetime,
      subtitle: band && band.name && "Band: ".concat(band.name)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "band",
      slot: "media",
      src: band_img_or_event_img || '../static/img/band_noimg.png',
      at_nologo: (!band_img_or_event_img).toString(),
      alt: "band",
      width: "80"
    }));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Tabbar__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (EventCards);

/***/ }),

/***/ "./src/components/EventCards.less":
/*!****************************************!*\
  !*** ./src/components/EventCards.less ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./EventCards.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/components/EventCards.less");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1__);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1___default.a, options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals;

    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./EventCards.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/components/EventCards.less",
      function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./EventCards.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/components/EventCards.less");
/* harmony import */ _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1__);
(function () {
        if (!isEqualLocals(oldLocals, _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals, undefined)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals;

              update(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1___default.a);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_EventCards_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals || {});

/***/ }),

/***/ "./src/components/PanelRight.jsx":
/*!***************************************!*\
  !*** ./src/components/PanelRight.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Page"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Navbar"], {
    title: "Right Panel"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["BlockTitle"], null, "Left Panel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Block"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "-- --", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    panelClose: true
  }, "close"), ". LNO Settings")));
});

/***/ }),

/***/ "./src/components/Tabbar.jsx":
/*!***********************************!*\
  !*** ./src/components/Tabbar.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Toolbar"], {
    position: "bottom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    href: "/",
    text: "Live",
    iconIos: "f7:play",
    iconAurora: "f7:play",
    iconMd: "material:play"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    href: "#",
    text: "Chat",
    iconIos: "f7:chat_bubble_2",
    iconAurora: "f7:chat_bubble_2",
    iconMd: "material:chat_bubble_2"
  }))
  /*<div className="toolbar tabbar toolbar-bottom">
    <div className="toolbar-inner">
      <a className="link tab-link tab-link-active" href="#" data-tab="#view-today">
        <i className="icon f7-icons">envelope_fill</i><span className="">Today</span></a>
      <a className="link tab-link" href="#" data-tab="#view-arcade"><i
        className="icon f7-icons">rocket_fill</i><span className="">Arcade</span></a>
      <a className="link tab-link" href="#" data-tab="#view-eventt"><i className="icon f7-icons">rocket_fill</i><span
        className="">Events</span></a>
    </div>
  </div>*/
  ;
});

/***/ }),

/***/ "./src/css/app.less":
/*!**************************!*\
  !*** ./src/css/app.less ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./app.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/css/app.less");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1__);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1___default.a, options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals;

    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./app.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/css/app.less",
      function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./app.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/css/app.less");
/* harmony import */ _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1__);
(function () {
        if (!isEqualLocals(oldLocals, _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals, undefined)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals;

              update(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1___default.a);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_app_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals || {});

/***/ }),

/***/ "./src/fonts/Framework7Icons-Regular.eot":
/*!***********************************************!*\
  !*** ./src/fonts/Framework7Icons-Regular.eot ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/Framework7Icons-Regular.a53248.eot");

/***/ }),

/***/ "./src/fonts/Framework7Icons-Regular.ttf":
/*!***********************************************!*\
  !*** ./src/fonts/Framework7Icons-Regular.ttf ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/Framework7Icons-Regular.9a3eec.ttf");

/***/ }),

/***/ "./src/fonts/Framework7Icons-Regular.woff":
/*!************************************************!*\
  !*** ./src/fonts/Framework7Icons-Regular.woff ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/Framework7Icons-Regular.d5ef5c.woff");

/***/ }),

/***/ "./src/fonts/Framework7Icons-Regular.woff2":
/*!*************************************************!*\
  !*** ./src/fonts/Framework7Icons-Regular.woff2 ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/Framework7Icons-Regular.529623.woff2");

/***/ }),

/***/ "./src/fonts/MaterialIcons-Regular.eot":
/*!*********************************************!*\
  !*** ./src/fonts/MaterialIcons-Regular.eot ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/MaterialIcons-Regular.4674f8.eot");

/***/ }),

/***/ "./src/fonts/MaterialIcons-Regular.ttf":
/*!*********************************************!*\
  !*** ./src/fonts/MaterialIcons-Regular.ttf ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/MaterialIcons-Regular.5e7382.ttf");

/***/ }),

/***/ "./src/fonts/MaterialIcons-Regular.woff":
/*!**********************************************!*\
  !*** ./src/fonts/MaterialIcons-Regular.woff ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/MaterialIcons-Regular.83beba.woff");

/***/ }),

/***/ "./src/fonts/MaterialIcons-Regular.woff2":
/*!***********************************************!*\
  !*** ./src/fonts/MaterialIcons-Regular.woff2 ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/MaterialIcons-Regular.cff684.woff2");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framework7_lite_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framework7/lite-bundle */ "./node_modules/framework7/esm/framework7-lite-bundle.js");
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/App */ "./src/components/App.jsx");
/* harmony import */ var framework7_framework7_bundle_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! framework7/framework7-bundle.css */ "./node_modules/framework7/framework7-bundle.css");
/* harmony import */ var _css_app_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../css/app.less */ "./src/css/app.less");







framework7_lite_bundle__WEBPACK_IMPORTED_MODULE_2__["default"].use(framework7_react__WEBPACK_IMPORTED_MODULE_3__["default"]); // Mount React App

react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_4__["default"], {
  name: "brian3t",
  toggle: true,
  tz: 'PST'
}), document.getElementById('app'));

/***/ }),

/***/ "./src/js/conf.js":
/*!************************!*\
  !*** ./src/js/conf.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// eslint-disable-next-line no-unused-vars

/**
 * Local Settings for mobile app.
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  api: 'http://api.lnoapi/v1/',
  default_today_parms: {
    source: 'reverb'
  } //will be used in Today.jsx rest

});

/***/ }),

/***/ "./src/js/pwa.js":
/*!***********************!*\
  !*** ./src/js/pwa.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var PWA = {
  skipWaitingSent: false,
  registration: null,
  serviceWorkerPendingUpdate: false,
  listenForWaitingServiceWorker: function listenForWaitingServiceWorker(reg) {
    function awaitStateChange() {
      reg.installing.addEventListener('statechange', function onStateChange() {
        if (this.state === 'installed') PWA.promptUserToRefresh(reg);
      });
    }

    if (!reg) return;

    if (reg.waiting) {
      PWA.promptUserToRefresh(reg);
      return;
    }

    if (reg.installing) awaitStateChange();
    reg.addEventListener('updatefound', awaitStateChange);
  },
  promptUserToRefresh: function promptUserToRefresh(registration) {
    if (!(registration && registration.waiting)) return; // Show UI and then:

    PWA.skipWaitingSent = true;
    registration.waiting.postMessage('skipWaiting');
    PWA.serviceWorkerPendingUpdate = true;
  },
  init: function init() {
    if ('serviceWorker' in window.navigator) {
      window.navigator.serviceWorker.register('./service-worker.js', {
        scope: '/'
      }).then(function (registration) {
        PWA.registration = registration;
        PWA.listenForWaitingServiceWorker(registration);
      });
      var refreshing;
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (refreshing || !PWA.skipWaitingSent) return;
        refreshing = true; // window.location.reload();
      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (PWA);

/***/ }),

/***/ "./src/js/routes.js":
/*!**************************!*\
  !*** ./src/js/routes.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_Accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/Accordion */ "./src/pages/Accordion.jsx");
/* harmony import */ var _pages_Band__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/Band */ "./src/pages/Band.jsx");
/* harmony import */ var _pages_Eventt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/Eventt */ "./src/pages/Eventt.jsx");
/* harmony import */ var _components_PanelRight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/PanelRight */ "./src/components/PanelRight.jsx");
/* harmony import */ var _pages_Today__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pages/Today */ "./src/pages/Today.jsx");
/* harmony import */ var _pages_404__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pages/404 */ "./src/pages/404.jsx");





 // Pages

/* harmony default export */ __webpack_exports__["default"] = ([// Index page
{
  path: '/',
  component: _pages_Today__WEBPACK_IMPORTED_MODULE_4__["default"],
  // component: Today,
  master: function master(f7) {
    console.log(f7.theme);
    return f7.theme === 'aurora';
  }
}, // accordion page
{
  path: '/accordion/',
  component: _pages_Accordion__WEBPACK_IMPORTED_MODULE_0__["default"]
}, // event page
{
  path: '/band/',
  component: _pages_Band__WEBPACK_IMPORTED_MODULE_1__["default"]
}, // event page
{
  path: '/eventt/',
  component: _pages_Eventt__WEBPACK_IMPORTED_MODULE_2__["default"]
}, // kitchen sink page
{
  path: '/panel-right/',
  component: _components_PanelRight__WEBPACK_IMPORTED_MODULE_3__["default"]
}, // Default route (404 page). MUST BE THE LAST
{
  path: '(.*)',
  component: _pages_404__WEBPACK_IMPORTED_MODULE_5__["default"]
}]);

/***/ }),

/***/ "./src/jslib/jslib.js":
/*!****************************!*\
  !*** ./src/jslib/jslib.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var moment = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js"); // moment.tz.add('America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0');


var Jslib = {
  /**
   * Format date and time into readable
   * @param date in utc tz
   * @param time in utc tz, format: HH:mm:ss
   * @param timezone such as 'PST', 'UTC'
   */
  fm_date_time: function fm_date_time(date, time) {
    var timezone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'America/Los_Angeles';
    var mdate;

    if (!date) {
      mdate = moment('now');
    } else {
      mdate = moment(date);
    }

    var mtime = moment(time, 'HH:mm:ss');
    if (!mdate.isValid() || !mtime.isValid()) return 'N/A';
    var m_datetime = moment.utc("".concat(date, " ").concat(time), 'YYYY-MM-DD HH:mm:ss');
    if (!m_datetime.isValid()) return 'N/A';
    m_datetime = m_datetime.tz(timezone);
    return m_datetime.format('ddd MMM D hh:mmA');
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Jslib);

/***/ }),

/***/ "./src/pages/404.jsx":
/*!***************************!*\
  !*** ./src/pages/404.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Page"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Navbar"], {
    title: "Not found",
    backLink: "Back"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Block"], {
    strong: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Sorry"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Requested content not found.")));
});

/***/ }),

/***/ "./src/pages/Accordion.jsx":
/*!*********************************!*\
  !*** ./src/pages/Accordion.jsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Page"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Navbar"], {
    title: "Accordion",
    backLink: "Back"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["BlockTitle"], null, "List View Accordion"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["List"], {
    accordionList: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    accordionItem: true,
    title: "Lorem Ipsum"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Block"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    accordionItem: true,
    title: "Nested List"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["List"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 4"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    accordionItem: true,
    title: "Integer semper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Block"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum."))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["BlockTitle"], null, "Inset Accordion"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["List"], {
    accordionList: true,
    inset: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    accordionItem: true,
    title: "Lorem Ipsum"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Block"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    accordionItem: true,
    title: "Nested List"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["List"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 4"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    accordionItem: true,
    title: "Integer semper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Block"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum."))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["BlockTitle"], null, "Opposite Side"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["List"], {
    accordionList: true,
    accordionOpposite: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    accordionItem: true,
    title: "Lorem Ipsum"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Block"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    accordionItem: true,
    title: "Nested List"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["List"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    title: "Item 4"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["ListItem"], {
    accordionItem: true,
    title: "Integer semper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Block"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum."))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["BlockTitle"], null, "Custom Collapsible"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Block"], {
    inner: true,
    accordionList: true
  }, Array.from(Array(3).keys()).map(function (n) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionItem"], {
      key: n
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionToggle"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "Item ", n + 1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["AccordionContent"], null, "Content ", n + 1));
  })));
});

/***/ }),

/***/ "./src/pages/Band.jsx":
/*!****************************!*\
  !*** ./src/pages/Band.jsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");
/* harmony import */ var restful_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! restful-react */ "./node_modules/restful-react/dist/restful-react.esm.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Tabbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Tabbar */ "./src/components/Tabbar.jsx");
/* harmony import */ var _jslib_jslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../jslib/jslib */ "./src/jslib/jslib.js");


/**
 * Band view. Viewing single band
 */






 // import './Band.less';

var Band = function Band(props) {
  var f7router = props.f7router;
  var band_m = props.band_m,
      bandid = props.bandid;
  if (!bandid && !band_m) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Block"], null, "No data");
  if (!bandid) bandid = band_m.id;

  var _useGet = Object(restful_react__WEBPACK_IMPORTED_MODULE_4__["useGet"])({
    path: "http://api.lnoapi/v1/band/".concat(bandid, "?expand=events")
  }),
      data = _useGet.data;

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(data) === 'object') band_m = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.extend(band_m, data);
  var loc = band_m.attr.location;

  if (typeof loc === 'string') {
    try {
      loc = JSON.parse(loc);
    } catch (e) {}
  }

  var event_clicked = function event_clicked(event_m, event_id) {
    f7router.navigate('/event/', {
      props: {
        event_m: event_m,
        event_id: event_id
      }
    });
    console.warn("event clicked");
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Page"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Navbar"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["NavLeft"], {
    backLink: "Back",
    backLinkShowText: false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["NavTitle"], null, "Live 'N' Out - Band"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["NavRight"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    className: "f7-icons",
    panelOpen: "right"
  }, "bars"))), band_m ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "text_center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, band_m.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    className: "profile_pic_sml",
    src: band_m.logo,
    alt: "band_logo"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, band_m.website && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: band_m.website,
    className: "link external",
    target: "_blank",
    rel: "noreferrer"
  }, "Home Page"), band_m.attr.homepage_url && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: band_m.attr.homepage_url,
    className: "link external",
    target: "_blank",
    rel: "noreferrer"
  }, "Home Page"), band_m.facebook && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: band_m.facebook,
    className: "link external",
    target: "_blank",
    rel: "noreferrer"
  }, "Facebook")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "col-70"
  }, band_m.short_desc), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "col-30"
  }, band_m.age_limit, " ", band_m.cost)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row location"
  }, loc && "Location: ", loc && loc.city && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, loc.city), loc && loc.state && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, loc.state), loc && loc.country && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, loc.country)), band_m.events ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Events") : '', band_m.events ? band_m.events.map(function (event_m) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      id: "band_event",
      key: event_m.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      onClick: function onClick() {
        return event_clicked(band_m);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Card"], {
      className: "clickable card-header-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["CardHeader"], {
      className: "no-border profile_pic_banner small",
      valign: "bottom",
      style: {
        backgroundImage: "url(".concat(event_m.img, ")")
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["CardContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, event_m.name, " ", event_m.when), event_m.website ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      target: "_blank",
      external: true,
      href: event_m.website
    }, "Home Page") : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, _jslib_jslib__WEBPACK_IMPORTED_MODULE_7__["default"].fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc))))));
  }) : '', ") : '' }") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "Loading.."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Tabbar__WEBPACK_IMPORTED_MODULE_6__["default"], null));
};

Band.propTypes = {
  band_m: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object // eventid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])

};
Band.defaultProps = {
  band_m: {}
};
/* harmony default export */ __webpack_exports__["default"] = (Band);

/***/ }),

/***/ "./src/pages/Eventt.jsx":
/*!******************************!*\
  !*** ./src/pages/Eventt.jsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");
/* harmony import */ var restful_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! restful-react */ "./node_modules/restful-react/dist/restful-react.esm.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Tabbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Tabbar */ "./src/components/Tabbar.jsx");
/* harmony import */ var _jslib_jslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../jslib/jslib */ "./src/jslib/jslib.js");


/**
 * Event view. Viewing single event
 */






 // import './Event.less';

var Eventt = function Eventt(props) {
  var f7router = props.f7router;
  var event_m = props.event_m,
      eventid = props.eventid;
  if (!eventid && !event_m) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Block"], null, "No data");
  if (!eventid) eventid = event_m.id;

  var _useGet = Object(restful_react__WEBPACK_IMPORTED_MODULE_4__["useGet"])({
    path: "http://api.lnoapi/v1/event/".concat(eventid, "?expand=bands")
  }),
      data = _useGet.data;

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(data) === 'object') event_m = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.extend(event_m, data);

  var band_clicked = function band_clicked(first_band, bandid) {
    f7router.navigate('/band/', {
      props: {
        band_m: first_band
      }
    });
    console.warn("band clicked");
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Page"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Navbar"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["NavLeft"], {
    backLink: "Back",
    backLinkShowText: false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["NavTitle"], null, "Live 'N' Out - Event"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["NavRight"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    className: "f7-icons",
    panelOpen: "right"
  }, "bars"))), eventid && event_m ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "text_center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "pic",
    className: "profile_pic"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: event_m.img,
    alt: "event"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "name"
  }, event_m.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, _jslib_jslib__WEBPACK_IMPORTED_MODULE_7__["default"].fm_date_time(event_m.date_utc || event_m.start_datetime_utc, event_m.start_time_utc))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "col-70"
  }, event_m.short_desc), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "col-30"
  }, event_m.age_limit, " ", event_m.cost)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, event_m.website && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: event_m.website,
    className: "link external",
    target: "_blank",
    rel: "noreferrer"
  }, "Website"), event_m.facebook && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: event_m.facebook,
    className: "link external",
    target: "_blank",
    rel: "noreferrer"
  }, "Facebook")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null), event_m.bands ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Bands") : '', event_m.bands && event_m.bands.map(function (band_m) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      id: "event_band",
      key: band_m.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      onClick: function onClick() {
        return band_clicked(band_m);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Card"], {
      className: "clickable card-header-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["CardHeader"], {
      className: "no-border profile_pic_banner",
      valign: "bottom",
      style: {
        backgroundImage: "url(".concat(band_m.logo, ")")
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["CardContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, band_m.name, " ", band_m.genre), band_m.attr.homepage_url ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      target: "_blank",
      external: true,
      href: band_m.attr.homepage_url
    }, "Home Page") : ''))));
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, " Loading.."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Tabbar__WEBPACK_IMPORTED_MODULE_6__["default"], null));
};

Eventt.propTypes = {
  event_m: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object // eventid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])

};
Eventt.defaultProps = {
  event_m: {
    eventid: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Eventt);

/***/ }),

/***/ "./src/pages/Today.jsx":
/*!*****************************!*\
  !*** ./src/pages/Today.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framework7_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framework7-react */ "./node_modules/framework7-react/esm/framework7-react.js");
/* harmony import */ var restful_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! restful-react */ "./node_modules/restful-react/dist/restful-react.esm.js");
/* harmony import */ var _components_EventCards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/EventCards */ "./src/components/EventCards.jsx");
/* harmony import */ var _Today_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Today.less */ "./src/pages/Today.less");
/* harmony import */ var _js_conf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/conf */ "./src/js/conf.js");
/* eslint-disable react/jsx-one-expression-per-line */

/**
 * Today's view. Main view when startup.
 * todob: add Filter
 */





 //global config values
// import {events} from '../js/data';

var Today = function Today(props) {
  var f7route = props.f7route,
      f7router = props.f7router; // const { data: randomDogImage } = useGet({
  //   // Inferred from RestfulProvider in index.js
  //   path: "breeds/image/random",
  // });

  var query_parms = _js_conf__WEBPACK_IMPORTED_MODULE_5__["default"].default_today_parms;
  query_parms.expand = 'first_band';

  var _useGet = Object(restful_react__WEBPACK_IMPORTED_MODULE_2__["useGet"])("".concat(_js_conf__WEBPACK_IMPORTED_MODULE_5__["default"].api, "event"), {
    queryParams: query_parms
  }),
      events = _useGet.data;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Page"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Navbar"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["NavLeft"], {
    backLink: "Back",
    backLinkShowText: false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["NavTitle"], null, "Live 'N' Out"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["NavRight"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framework7_react__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "f7-icons",
    panelOpen: "right"
  }, "bars"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_EventCards__WEBPACK_IMPORTED_MODULE_3__["default"], {
    noCollapsedNavbar: true,
    events: events,
    f7route: f7route,
    f7router: f7router
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Today);

/***/ }),

/***/ "./src/pages/Today.less":
/*!******************************!*\
  !*** ./src/pages/Today.less ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./Today.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/pages/Today.less");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1__);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1___default.a, options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals;

    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./Today.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/pages/Today.less",
      function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src!../../node_modules/less-loader/dist/cjs.js!./Today.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/less-loader/dist/cjs.js!./src/pages/Today.less");
/* harmony import */ _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1__);
(function () {
        if (!isEqualLocals(oldLocals, _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals, undefined)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals;

              update(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1___default.a);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_src_index_js_node_modules_less_loader_dist_cjs_js_Today_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals || {});

/***/ }),

/***/ "./src/static/fonts/JosefinSans-Regular.ttf":
/*!**************************************************!*\
  !*** ./src/static/fonts/JosefinSans-Regular.ttf ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/JosefinSans-Regular.00ba5d.ttf");

/***/ }),

/***/ "./src/static/img/f7-icon.png":
/*!************************************!*\
  !*** ./src/static/img/f7-icon.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/f7-icon.1d1f44.png";

/***/ }),

/***/ 0:
/*!***********************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://127.0.0.1:8080 (webpack)/hot/dev-server.js ./src/js/app.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /var/www/lno/lno/node_modules/webpack-dev-server/client/index.js?http://127.0.0.1:8080 */"./node_modules/webpack-dev-server/client/index.js?http://127.0.0.1:8080");
__webpack_require__(/*! /var/www/lno/lno/node_modules/webpack/hot/dev-server.js */"./node_modules/webpack/hot/dev-server.js");
module.exports = __webpack_require__(/*! ./src/js/app.js */"./src/js/app.js");


/***/ })

/******/ });
//# sourceMappingURL=app.ff2203.js.map